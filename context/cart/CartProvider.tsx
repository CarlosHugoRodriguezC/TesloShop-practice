import React, { FC, PropsWithChildren, useEffect, useReducer } from 'react';
import Cookie from 'js-cookie';
import { ICartProduct, IOrder, IShippingAddress } from '../../interfaces';
import { CartContext } from './CartContext';
import { cartReducer } from './cartReducer';
import tesloApi from '../../api/tesloApi';
import axios from 'axios';

export interface CartState {
  isLoaded: boolean;
  cart: ICartProduct[];
  numberOfItems: number;
  subTotal: number;
  tax: number;
  total: number;
  shippingAddress?: IShippingAddress;
}

export const CART_INITIAL_STATE: CartState = {
  isLoaded: false,
  cart: [],
  numberOfItems: 0,
  subTotal: 0,
  tax: 0,
  total: 0,
};

export const CartProvider: FC<PropsWithChildren<{}>> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, CART_INITIAL_STATE);
  const [firstCharge, setFirstCharge] = React.useState(true);

  useEffect(() => {
    try {
      const cart = JSON.parse(Cookie.get('cart') || '[]');
      if (cart) {
        dispatch({
          type: '[Cart] Load card from cookies | storage',
          payload: cart,
        });
      }
    } catch (e) {
      console.log(e);
      dispatch({
        type: '[Cart] Load card from cookies | storage',
        payload: [],
      });
    }
    setFirstCharge(false);
  }, []);

  useEffect(() => {
    if (Cookie.get('firstName')) {
      const address: IShippingAddress = {
        firstName: Cookie.get('firstName') || '',
        lastName: Cookie.get('lastName') || '',
        address: Cookie.get('address') || '',
        address2: Cookie.get('address2') || '',
        zip: Cookie.get('zip') || '',
        city: Cookie.get('city') || '',
        country: Cookie.get('country') || '',
        phone: Cookie.get('phone') || '',
      };
      dispatch({ type: '[Cart] Load address from cookies', payload: address });
    }
  }, []);

  useEffect(() => {
    if (!firstCharge) {
      Cookie.set('cart', JSON.stringify(state.cart));
    }
  }, [state.cart]);

  useEffect(() => {
    const numberOfItems = state.cart.reduce(
      (acc, item) => acc + item.quantity,
      0
    );
    const subTotal = state.cart.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    const taxRate = Number(process.env.NEXT_PUBLIC_TAX_RATE || 0);

    const orderSumary = {
      numberOfItems,
      subTotal,
      tax: subTotal * taxRate,
      total: subTotal * (1 + taxRate),
    };

    dispatch({
      type: '[Cart] Update order summary',
      payload: orderSumary,
    });
  }, [state.cart]);

  const addProductToCart = (product: ICartProduct) => {
    const { cart } = state;

    const productInCart = cart.some(
      (item) => item._id === product._id && item.size === product.size
    );

    if (!productInCart) {
      return dispatch({
        type: '[Cart] Update cart',
        payload: [...cart, product],
      });
    }

    const updatedProducts = cart.map((p) => {
      if (p._id === product._id && p.size === product.size) {
        return { ...p, quantity: p.quantity + product.quantity };
      }
      return p;
    });

    dispatch({ type: '[Cart] Update cart', payload: updatedProducts });
  };

  const updateQuantityOfProduct = (product: ICartProduct) => {
    dispatch({
      type: '[Cart] Change cart product quantity',
      payload: product,
    });
  };

  const removeProductFromCart = (product: ICartProduct) => {
    dispatch({
      type: '[Cart] Remove cart product',
      payload: product,
    });
  };

  const updateAddress = (address: IShippingAddress) => {
    Cookie.set('firstName', address.firstName);
    Cookie.set('lastName', address.lastName);
    Cookie.set('address', address.address);
    Cookie.set('address2', address.address2 || '');
    Cookie.set('zip', address.zip);
    Cookie.set('city', address.city);
    Cookie.set('country', address.country);
    Cookie.set('phone', address.phone);

    dispatch({ type: '[Cart] Update address', payload: address });
  };

  const createOrder = async (): Promise<{
    hasError: boolean;
    message: string;
  }> => {
    if (!state.shippingAddress) {
      throw new Error('No shipping address');
    }

    const body: IOrder = {
      orderItems: state.cart.map((item) => ({ ...item, size: item.size! })),
      shippingAddress: state.shippingAddress,
      numberOfItems: state.numberOfItems,
      subTotal: state.subTotal,
      tax: state.tax,
      total: state.total,
      isPaid: false,
    };

    try {
      const { data } = await tesloApi.post('/orders', body);
      // console.log(data);
      // TODO dispatch
      dispatch({ type: '[Cart] Order Completed'});
      return { hasError: false, message: data._id! };
    } catch (error) {
      console.log(error);
      if (axios.isAxiosError(error)) {
        return {
          hasError: true,
          message: (error as any).response?.data.message,
        };
      }
      return { hasError: true, message: 'Unknown error' };
    }
  };

  return (
    <CartContext.Provider
      value={{
        ...state,
        addProductToCart,
        updateQuantityOfProduct,
        removeProductFromCart,
        updateAddress,
        createOrder,
      }}>
      {children}
    </CartContext.Provider>
  );
};
