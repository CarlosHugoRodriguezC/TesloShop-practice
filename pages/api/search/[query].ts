import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../database';
import { Product } from '../../../models';
import { IProduct } from '../../../interfaces/';

type Data = {
  message: string;
} | IProduct[];

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case 'GET':
      return searchProducts(req, res);
    default:
      return res.status(405).json({ message: 'Method Not Allowed' });
  }
}

const searchProducts = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const { query = '' } = req.query;

  if (query.length < 0)
    return res.status(400).json({ message: 'Bad Request query not provided' });

  try {
    db.connect();
     const products = await Product.find({
        $text : { $search : query as string }
     }).select('title images price inStock slug -_id').lean();
    db.disconnect();

    return res.status(200).json(products);
  } catch (error) {
    db.disconnect();
    return res.status(500).json({ message: `Something went wrong: ${error}` });
  }
};
