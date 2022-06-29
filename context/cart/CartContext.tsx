import { createContext } from 'react';
import { ICartProduct } from '../../interfaces';
import { CartState, IShippingAddress } from './';

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
}

export const CartContext = createContext({} as ContextProps);
