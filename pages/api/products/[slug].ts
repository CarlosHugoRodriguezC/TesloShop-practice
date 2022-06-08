import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../database';
import { IProduct } from '../../../interfaces/products';
import { Product } from '../../../models';

type Data =
  | {
      message: string;
    }
  | IProduct;

export default function handler (req: NextApiRequest, res: NextApiResponse<Data>) {
  switch (req.method) {
    case 'GET':
      return getProduct(req, res);
    default:
      return res.status(405).json({ message: 'Method not allowed' });
  }
}
const getProduct = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { slug } = req.query;

  if (!slug) {
    return res.status(400).json({ message: 'Missing slug' });
  }

  try {
    db.connect();

    const product = await Product.findOne({ slug })
      .lean();

    if (!product) {
      db.disconnect();
      return res.status(404).json({ message: 'Product not found' });
    }

    db.disconnect();

    return res.status(200).json(product);
  } catch (error) {
    db.disconnect();
    return res.status(500).json({ message: `Something went wrong: ${error}` });
  }
};
