import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../database';
import { Order, Product, User } from '../../../models';

type Data =
  | {
      message: string;
    }
  | {
      numberOfOrders: number;
      paidOrders: number;
      unpaidOrders: number;
      numberOfClients: number;
      numberOfProducts: number;
      productsWithNoInventory: number;
      productsWithLowInventory: number;
    };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    await db.connect();
    
    const [
        numberOfOrders,
        paidOrders,
        unpaidOrders,
        numberOfClients,
        numberOfProducts,
        productsWithNoInventory,
        productsWithLowInventory,
    ] = await Promise.all([
        Order.countDocuments(),
      Order.countDocuments({ isPaid: true }),
      Order.countDocuments({ isPaid: false }),
      User.countDocuments({ role: 'client' }),
      Product.countDocuments(),
      Product.countDocuments({ inStock: 0 }),
      Product.countDocuments({ inStock: { $lte: 10 } }),
    ]);

    await db.disconnect();

    return res.status(200).json({
      numberOfOrders,
      paidOrders,
      unpaidOrders,
      numberOfClients,
      numberOfProducts,
      productsWithNoInventory,
      productsWithLowInventory,
    });
  } catch (error) {
    console.error(error);
    await db.disconnect();
    res.status(500).json({ message: 'Error al obtener los datos' });
  }
}
