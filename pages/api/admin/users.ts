import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../database';
import { IUser } from '../../../interfaces';
import { User } from '../../../models';
import { isValidObjectId } from 'mongoose';

type Data =
  | {
      message: string;
    }
  |  IUser[];
    

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case 'GET':
      return getUsers(req, res);
    case 'PUT':
      return updateUser(req, res);
    default:
      return res.status(405).json({ message: 'Method Not Allowed' });
  }
}

const getUsers = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  await db.connect();
  const users = await User.find({}).select('-password').lean();
  await db.disconnect();

  return res.status(200).json(users);
};

const updateUser = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { userId = '', role = '' } = req.body;

  if (!isValidObjectId(userId)) {
    return res.status(400).json({ message: `Invalid userId ${userId}` });
  }

  const validRoles = ['admin', 'client'];
  if (!validRoles.includes(role.toString())) {
    return res.status(400).json({ message: `Invalid role ${role}` });
  }

  await db.connect();
  const user = await User.findById(userId);
  if (!user) {
    await db.disconnect();
    return res.status(404).json({ message: 'User not found' });
  }

  user.role = role.toString() as 'admin' | 'client';

  await user.save();

  await db.disconnect();

  return res.status(200).json({ message: 'user update successfuly' });
};
