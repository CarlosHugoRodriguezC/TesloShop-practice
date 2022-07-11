import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../database';
import { Order } from '../../../models';
import { IOrder } from '../../../interfaces/order';

type Data =
  | {
      message: string;
    }
  | IOrder[];

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case 'GET':
      return getOrders(req, res);
    default:
      return res.status(405).json({ message: 'Method Not Allowed' });
  }
}
const getOrders = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  await db.connect();
  const orders = await Order.find({})
    .sort({ createdAt: 'desc' })
    .populate('user', 'email name')
    .lean();
  await db.disconnect();
  return res.status(200).json(orders);
};
