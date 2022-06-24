import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../database';
import { initialData } from '../../database/seed-data';
import { Product, User } from '../../models/';

type Data = {};
const {products, users} = initialData;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (process.env.NODE_ENV === 'production') {
    return res.status(401).json({
      message: ' No tiene acceso a este servicio ',
    });
  }

  await db.connect();

  await Product.deleteMany();
  await Product.insertMany(products);

  await User.deleteMany();
  await User.insertMany(users);

  await db.disconnect();

  res.status(200).json({ message: 'Proceso realizado correctamente' });
}
