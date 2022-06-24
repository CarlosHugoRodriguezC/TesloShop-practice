import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../database';
import { User } from '../../../models';
import bcrypt from 'bcryptjs';
import { jwt } from '../../../utils';

type Data =
  | {
      message: string;
    }
  | {
      token: string;
      user: {
        name: string;
        email: string;
        role: string;
      };
    };

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case 'GET':
      return checkJWT(req, res);
    default:
      return res.status(405).json({ message: 'Method not allowed' });
  }
}

const checkJWT = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { token = '' } = req.cookies;
  // res.status(200).json({ token } as any);

  let userId = '';

  try {
    userId = await jwt.isValid(token);
  } catch (err) {
    return res.status(400).json({ message: 'token is not valid' });
  }

  await db.connect();
  const user = await User.findOne({ _id: userId });
  await db.disconnect();

  if (!user) return res.status(400).json({ message: 'User not exist' });

  const { role, name, _id, email } = user;

  const newtoken = jwt.signToken(_id, email);

  return res.status(200).json({
    token: newtoken,
    user: {
      email,
      name,
      role,
    },
  });
};
