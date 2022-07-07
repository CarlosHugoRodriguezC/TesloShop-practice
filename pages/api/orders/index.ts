import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { db } from '../../../database';
import { IOrder } from '../../../interfaces';
import { Order, Product } from '../../../models';

type Data =
  | {
      message: string;
    }
  | IOrder;

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case 'POST':
      return createOrder(req, res);
    default:
      return res.status(405).json({ message: 'Method Not Allowed' });
  }
}

const createOrder = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { orderItems, total } = req.body as IOrder;

  // TODO verify user session

  const session: any = await getSession({ req });

  if (!session) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  // TODO create an array with all the order items

  const productsIds = orderItems.map((item) => item._id);

  await db.connect();
  const dbProducts = await Product.find({ _id: { $in: productsIds } }).lean();

  try {
    const subTotal = orderItems.reduce((prev, current) => {
      const currentPrice = dbProducts.find(
        (product) => product._id.toString() === current._id.toString()
      )!.price;

      if (!currentPrice) {
        throw new Error('Product not found verify the cart and try again');
      }

      return currentPrice * current.quantity + prev;
    }, 0);

    const taxRate = Number(process.env.NEXT_PUBLIC_TAX_RATE || 0);

    const backendTotal = subTotal * (taxRate + 1);

    if (backendTotal !== total) {
      throw new Error('Total does not match');
    }

    const userId = session.user._id;

    const newOrder = new Order({ ...req.body, isPaid: false, user: userId });

    await newOrder.save();

    await db.disconnect();

    return res.status(201).json(newOrder);
  } catch (error: any) {
    console.log(error);
    await db.disconnect();
    return res
      .status(400)
      .json({ message: error.message || 'Something went wrong' });
  }
};
