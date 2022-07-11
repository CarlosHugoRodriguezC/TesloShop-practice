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
import React, { useContext, useEffect, useState } from 'react';
import { CartList, OrderSummary } from '../../components/cart';
import { ShopLayout } from '../../components/layouts';
import NextLink from 'next/link';
import { CartContext } from '../../context';
import { countries } from '../../utils';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import { color } from '@mui/system';

const Summary = () => {
  const router = useRouter();
  const { shippingAddress, numberOfItems, createOrder } =
    useContext(CartContext);

  const [isPosting, setIsPosting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (!Cookies.get('firstName')) router.push('/checkout/address');
  }, [router]);

  const onCreateOrder = async () => {
    setIsPosting(true);
    const { hasError, message } = await createOrder();
    if (hasError) {
      setIsPosting(false);
      setErrorMessage(message);
      return ;
    }
    router.replace(`/orders/${message}`)
  };

  if (!shippingAddress) {
    return <></>;
  }

  const { firstName, lastName, address, address2, zip, city, country, phone } =
    shippingAddress!;

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
                Resumen ({numberOfItems} producto {numberOfItems > 1 && 's'})
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

              <Typography>
                {firstName} {lastName}
              </Typography>
              <Typography>
                {address} {address2 && address2}
              </Typography>
              <Typography>C.P. {zip}</Typography>
              <Typography>{city}</Typography>
              <Typography>
                {countries.find((c) => c.code === country)?.name}
              </Typography>
              <Typography>{phone}</Typography>

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
                }}
                display='flex'
                flexDirection='column'>
                <Button
                  color='secondary'
                  className='circular-btn'
                  size='large'
                  type='button'
                  fullWidth
                  onClick={onCreateOrder}
                  disabled={isPosting}>
                  Confirmar Orden
                </Button>
                <Chip
                  color='error'
                  label={errorMessage}
                  sx={{
                    mt: 2,
                    display: errorMessage ? 'flex' : 'none',
                  }}
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </ShopLayout>
  );
};

export default Summary;
