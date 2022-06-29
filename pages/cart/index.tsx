import React, { useContext, useEffect } from 'react';
import NextLink from 'next/link';
import { ShopLayout } from '../../components/layouts/ShopLayout';
import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  Typography,
} from '@mui/material';
import { CartList, OrderSummary } from '../../components/cart';
import { CartContext } from '../../context';

import { useRouter } from 'next/router';

const CartPage = () => {
  const { isLoaded, numberOfItems } = useContext(CartContext);

  const router = useRouter();
  useEffect(() => {
    if (isLoaded && numberOfItems === 0) {
      router.replace('/cart/empty');
    }
  }, [isLoaded, numberOfItems, router]);

  if (!isLoaded || numberOfItems === 0) {
    return <></>;
  }

  return (
    <ShopLayout
      title={'Carrito - 3'}
      pageDescription={'Carrito de compras de la tienda'}>
      <Typography variant='h1' component='h1'>
        Carrito
      </Typography>

      <Grid container>
        <Grid item xs={12} sm={7}>
          {/* Cart List */}
          <CartList editable />
        </Grid>
        <Grid item xs={12} sm={5}>
          <Card>
            <CardContent>
              <Typography variant='h2' component='h2'>
                Order
              </Typography>
              <Divider sx={{ my: 1 }} />
              {/* Order summary */}
              <OrderSummary />
              <Box
                sx={{
                  mt: 3,
                }}>
                <NextLink href='/checkout/address' passHref>
                  <Button
                    color='secondary'
                    variant='contained'
                    className='circular-btn'
                    size='large'
                    fullWidth>
                    Checkout
                  </Button>
                </NextLink>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </ShopLayout>
  );
};

export default CartPage;
