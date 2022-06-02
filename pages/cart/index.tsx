import React from 'react';
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
import NextLink from 'next/link';

const CartPage = () => {
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
                  <Button color='secondary'  variant='contained' className='circular-btn' fullWidth>
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
