import jwt from 'jsonwebtoken';

export const signToken = (_id: string, email: string) => {
  if (!process.env.JWT_SECRET_SEED) {
    throw new Error('JWT_SECRET_SEED is not defined');
  }

  return jwt.sign(
    {
      _id,
      email,
    },
    process.env.JWT_SECRET_SEED,
    { expiresIn: '30d' }
  );
};

export const isValid = (token: string): Promise<string> => {
  if (!process.env.JWT_SECRET_SEED)
    throw new Error('JWT_SECRET_SEED is not defined');

  if (token.length < 10) {
    return Promise.reject('Token is not valid');
  }
  
  return new Promise((resolve, reject) => {
    try {
      jwt.verify(token, process.env.JWT_SECRET_SEED || '', (err, decoded) => {
        if (err) {
          reject('json web token is not valid');
        }

        const { _id } = decoded as { _id: string };

        return resolve(_id);
      });
    } catch {
      return reject('json web token is not valid');
    }
  });
};
