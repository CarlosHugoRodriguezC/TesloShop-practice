import { db } from '.';
import { User } from '../models';
import bcrypt from 'bcryptjs';

export const checkUserEmailPassword = async (
  email: string,
  password: string
) => {
  await db.connect();
  const user = await User.findOne({ email });
  await db.disconnect();

  if (!user) {
    return null;
  }

  if (!bcrypt.compareSync(password, user.password!)) {
    return null;
  }

  const { _id, name, role } = user;

  return {
    _id,
    email: email.toLowerCase(),
    name,
    role,
  };
};

export const oAuthToDB = async (oAuthEmail: string, oAuthName: string) => {
  await db.connect();
  const user = await User.findOne({ email: oAuthEmail });

  if (user) {
    await db.disconnect();
    const { _id, name, role } = user;
    return {
      _id,
      email: oAuthEmail.toLowerCase(),
      name,
      role,
    };
  }

  const newUser = new User({
    email: oAuthEmail.toLowerCase(),
    name: oAuthName,
    password: '@',
    role: 'client',
  });

  await newUser.save();

  await db.disconnect();

  const { _id, name, role } = newUser;
  return {
    _id,
    email: oAuthEmail.toLowerCase(),
    name,
    role,
  };
};
