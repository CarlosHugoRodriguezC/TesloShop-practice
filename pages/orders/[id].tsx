import {
  Typography,
  Grid,
  Card,
  CardContent,
  Divider,
  Box,
  Button,
  Link,
  Chip,
} from '@mui/material';
import React from 'react';
import { CartList, OrderSummary } from '../../components/cart';
import { ShopLayout } from '../../components/layouts';
import NextLink from 'next/link';
import { CreditCardOutlined, CreditScoreOutlined } from '@mui/icons-material';

const OrderPage = () => {
  return (
    <ShopLayout
      title={'Resumen de la orden 231234134'}
      pageDescription={'Resumen de la orden'}>
      <Typography variant='h1' component='h1'>
        Orden ABC123
      </Typography>

      <Chip
        sx={{ mb: 2 }}
        label='Pendiente de pago'
        variant='filled'
        color='error'
        icon={<CreditCardOutlined />}
      />

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
                <Typography variant='h4' component='h4' fontWeight={600} sx={{mb: 5}}>
                  Pagar
                </Typography>
                <Chip
                  sx={{ mb: 2 }}
                  label='Orden ya fue pagada'
                  variant='filled'
                  color='success'
                  icon={<CreditScoreOutlined />}
                />
                <NextLink href='/checkout' passHref>
                  <Button color='secondary'  variant='contained' className='circular-btn' fullWidth>
                    Pagar
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

export default OrderPage;
