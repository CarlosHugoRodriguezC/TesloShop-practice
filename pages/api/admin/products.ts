import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../database';
import { IProduct } from '../../../interfaces';
import { Product } from '../../../models';
import { isValidObjectId } from 'mongoose';

import { v2 as Cloudinary } from 'cloudinary';
Cloudinary.config(process.env.CLOUDINARY_URL || '');

type Data =
  | {
      message: string;
    }
  | IProduct[]
  | IProduct;

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case 'GET':
      return getProducts(req, res);
    case 'PUT':
      return updateProduct(req, res);
    case 'POST':
      return createProduct(req, res);

    default:
      return res.status(405).json({ message: 'Method Not Allowed' });
  }
}

const getProducts = async (req: NextApiRequest, res: NextApiResponse) => {
  await db.connect();
  const products = await Product.find({}).sort({ title: 'asc' }).lean();
  await db.disconnect();

  return res.status(200).json(
    products.map((product) => ({
      ...product,
      images: product.images.map((image) =>
        image.includes('http')
          ? image
          : `${process.env.HOST_NAME || ''}products/${image}`
      ),
    }))
  );
};

const updateProduct = async (req: NextApiRequest, res: NextApiResponse) => {
  const { _id = '', images = [] } = req.body as IProduct;

  if (!isValidObjectId(_id)) {
    return res.status(400).json({ message: 'Invalid Product ID' });
  }

  if (images.length < 2) {
    return res.status(400).json({ message: 'Invalid Product Images' });
  }

  // TODO posiblemente tendremos un url completo para las imagenes

  try {
    await db.connect();
    const product = await Product.findById(_id);
    if (!product) {
      await db.disconnect();
      return res.status(404).json({ message: 'Product Not Found' });
    }
    await db.disconnect();
    // * delete fotos en Cloudinary 

    product.images.forEach(async (image) => {
      if(!images.includes(image)) {
        const [fileId, extension] = image.substring(image.lastIndexOf('/') + 1).split('.');

        await Cloudinary.uploader.destroy(fileId);
      }
    });

    await product.update(req.body, { new: true });
    return res.status(200).json(product);
  } catch (error) {
    await db.disconnect();
    console.log(error);
    return res.status(500).json({ message: 'Error updating product' });
  }
};

const createProduct = async (req: NextApiRequest, res: NextApiResponse) => {
  const { images = [] } = req.body as IProduct;

  if (images.length < 2) {
    return res.status(400).json({ message: 'Invalid Product Images' });
  }
  // TODO posiblemente tendremos un url completo para las imagenes

  try {
    await db.connect();

    const productDB = await Product.findOne({ slug: req.body.slug });

    if (productDB) {
      await db.disconnect();
      return res
        .status(400)
        .json({ message: 'Product already exists with the slug' });
    }

    const product = new Product(req.body);

    await product.save();

    await db.disconnect();
    return res.status(201).json(product);
  } catch (error) {
    await db.disconnect();
    console.log(error);
    return res.status(500).json({ message: 'Error creating product' });
  }
};
