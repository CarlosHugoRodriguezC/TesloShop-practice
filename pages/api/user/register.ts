import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../database';
import { User } from '../../../models';
import bcrypt from 'bcryptjs';
import { jwt, validations } from '../../../utils';

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
    case 'POST':
      return registerUser(req, res);
    default:
      return res.status(405).json({ message: 'Method not allowed' });
  }
}

const registerUser = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const {
    email = '',
    password = '',
    name = '',
  } = req.body as { email: string; password: string; name: string };

  if (password.length < 6)
    return res
      .status(400)
      .json({ message: 'Password must be at least 6 characters' });

  if (name.length < 2)
    return res
      .status(400)
      .json({ message: 'Name must be at least 2 characters' });

  //   TODO validar email

  if (!validations.isValidEmail(email))
    return res.status(400).json({ message: 'Email is not valid' });

  await db.connect();
  const user = await User.findOne({ email });
  if (user) {
    await db.disconnect();
    return res.status(400).json({ message: 'User already exists' });
  }

  const newUser = new User({
    email: email.toLowerCase(),
    password: bcrypt.hashSync(password),
    name,
    role: 'client',
  });

  try {
    await newUser.save({ validateBeforeSave: true });
    await db.disconnect();

    const { role, _id } = newUser;

    const token = jwt.signToken(_id, name);

    return res.status(201).json({ token, user: { name, email, role } });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Error registering user' });
  }
};
