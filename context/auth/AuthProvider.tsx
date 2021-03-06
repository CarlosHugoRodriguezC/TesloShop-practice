import { FC, PropsWithChildren, useEffect, useReducer } from 'react';
import { useRouter } from 'next/router';
import { tesloApi } from '../../api';
import { IUser } from '../../interfaces';
import { AuthContext, authReducer } from './';
import Cookie from 'js-cookie';
import axios from 'axios';
import { signOut, useSession } from 'next-auth/react';

export interface AuthState {
  isLoggedIn: boolean;
  user?: IUser;
}

const INITIAL_STATE: AuthState = {
  isLoggedIn: false,
  user: undefined,
};

export const AuthProvider: FC<PropsWithChildren<{}>> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, INITIAL_STATE);
  const { status, data } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'authenticated') {
      dispatch({ type: '[Auth] - Login', payload: (data as any)?.user as IUser });
      // TODO: Check if this is the right way to do this
    }
  }, [status]);

  // useEffect(() => {
  //   checkToken();
  // }, []);

  const checkToken = async () => {
    if (!Cookie.get('token')) return;
    try {
      // llamar al endpoint
      const {
        data: { token, user },
      } = await tesloApi.get('/user/validate-token');
      // revalidar token
      Cookie.set('token', token);
      // dispatch login action
      dispatch({ type: '[Auth] - Login', payload: user });
    } catch (error) {
      Cookie.remove('token');
      // if error delete cookie and dispatch logout action
      dispatch({ type: '[Auth] - Logout' });
    }
  };

  const loginUser = async (
    email: string,
    password: string
  ): Promise<boolean> => {
    try {
      const { data } = await tesloApi.post('/user/login', { email, password });
      const { token, user } = data;
      Cookie.set('token', token);
      dispatch({ type: '[Auth] - Login', payload: user });
      return true;
    } catch (error) {
      return false;
    }
  };

  const registerUser = async (
    name: string,
    email: string,
    password: string
  ): Promise<{
    hasError: boolean;
    message?: string;
  }> => {
    try {
      const { data } = await tesloApi.post('/user/register', {
        name,
        email,
        password,
      });
      const { token, user } = data;
      Cookie.set('token', token);
      dispatch({ type: '[Auth] - Login', payload: user });
      return {
        hasError: false,
      };
    } catch (error) {
      if (axios.isAxiosError(error))
        return {
          hasError: true,
          message: (error.response?.data as { message: string }).message,
        };
      return {
        hasError: true,
        message: 'Error registering user, try again later',
      };
    }
  };

  const logoutUser = () => {
    // Cookie.remove('token');
    Cookie.remove('cart');
    Cookie.remove('firstName');
    Cookie.remove('lastName');
    Cookie.remove('address');
    Cookie.remove('address2');
    Cookie.remove('zip');
    Cookie.remove('city');
    Cookie.remove('country');
    Cookie.remove('phone');
    
    // router.reload();
    signOut();
  };

  return (
    <AuthContext.Provider
      value={{ ...state, loginUser, registerUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};
