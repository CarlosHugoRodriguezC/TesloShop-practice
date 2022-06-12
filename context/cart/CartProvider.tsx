import React, { FC, PropsWithChildren, useEffect, useReducer } from 'react';
import Cookie from 'js-cookie';
import { ICartProduct } from '../../interfaces';
import { CartContext } from './CartContext';
import { cartReducer } from './cartReducer';

export interface CartState {
  cart: ICartProduct[];
  numberOfItems: number;
  subTotal: number;
  tax: number;
  total: number;
}

export const CART_INITIAL_STATE: CartState = {
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

  return (
    <CartContext.Provider
      value={{
        ...state,
        addProductToCart,
        updateQuantityOfProduct,
        removeProductFromCart,
      }}>
      {children}
    </CartContext.Provider>
  );
};
