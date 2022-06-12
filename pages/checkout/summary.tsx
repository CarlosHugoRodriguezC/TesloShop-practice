import {
  Typography,
  Grid,
  Card,
  CardContent,
  Divider,
  Box,
  Button,
  Link,
} from '@mui/material';
import React from 'react';
import { CartList, OrderSummary } from '../../components/cart';
import { ShopLayout } from '../../components/layouts';
import NextLink from 'next/link';

const summary = () => {
  return (
    <ShopLayout
      title={'Resumen de orden'}
      pageDescription={'Resumen de la orden'}>
      <Typography variant='h1' component='h1'>
        Carrito
      </Typography>

      <Grid container>
        <Grid item xs={12} sm={7}>
          {/* Cart List */}
          <CartList />
        </Grid>
        <Grid item xs={12} sm={5}>
          <Card>
            <CardContent>
              <Typography variant='h2' component='h2'>
                Resumen (3 productos)
              </Typography>
              <Divider sx={{ my: 1 }} />
              <Box display='flex' justifyContent='space-between'>
                <Typography variant='subtitle1'>
                  Dirección de entrega
                </Typography>
                <NextLink href='/checkout/address' passHref>
                  <Link underline='always'>Editar</Link>
                </NextLink>
              </Box>

              <Typography>Carlos Rodriguez</Typography>
              <Typography>Av. Siempre viva 333</Typography>
              <Typography>Col. Centro</Typography>
              <Typography>C.P. 12345</Typography>
              <Typography>Ciudad de México</Typography>
              <Typography>México</Typography>

              <Divider sx={{ my: 1 }} />
              <Box display='flex' justifyContent='flex-end'>
                <NextLink href='/cart' passHref>
                  <Link underline='always'>Editar</Link>
                </NextLink>
              </Box>

              {/* Order summary */}
              <OrderSummary />
              <Box
                sx={{
                  mt: 3,
                }}>
                <NextLink href='/checkout' passHref>
                  <Button
                    color='secondary'
                    variant='contained'
                    className='circular-btn'
                    fullWidth>
                    Confirmar Orden
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

export default summary;
