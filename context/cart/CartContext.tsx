import { createContext } from 'react';
import { ICartProduct, IShippingAddress } from '../../interfaces';
import { CartState } from './';

interface ContextProps extends CartState {
  // cart: ICartProduct[];
  // numberOfItems: number;
  // subTotal: number;
  // tax: number;
  // total: number;

  addProductToCart: (product: ICartProduct) => void;
  updateQuantityOfProduct: (product: ICartProduct) => void;
  removeProductFromCart: (product: ICartProduct) => void;
  updateAddress: (address: IShippingAddress) => void;
  createOrder: () => Promise<{ hasError: boolean; message: string }>;
}

export const CartContext = createContext({} as ContextProps);
