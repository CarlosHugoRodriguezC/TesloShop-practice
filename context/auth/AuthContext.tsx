import { createContext } from 'react';
import { IUser } from '../../interfaces';

interface AuthContextState {
  isLoggedIn: boolean;
  user?: IUser;
  loginUser: (email: string, password: string) => Promise<boolean>;
  registerUser: (
    name: string,
    email: string,
    password: string
  ) => Promise<{ hasError: boolean; message?: string }>;
  logoutUser: () => void;
}

export const AuthContext = createContext<AuthContextState>(
  {} as AuthContextState
);
