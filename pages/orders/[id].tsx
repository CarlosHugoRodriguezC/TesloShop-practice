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
import { GetServerSideProps, NextPage } from 'next';
import { getSession } from 'next-auth/react';
import { dbOrders } from '../../database';
import { IOrder } from '../../interfaces';
import { countries } from '../../utils';

interface Props {
  order: IOrder;
}

const OrderPage: NextPage<Props> = ({
  order: { shippingAddress, ...order },
}) => {
  return (
    <ShopLayout
      title={'Resumen de la orden 231234134'}
      pageDescription={'Resumen de la orden'}>
      <Typography variant='h1' component='h1'>
        Orden {order._id!}
      </Typography>

      {!order.isPaid && (
        <Chip
          sx={{ mb: 2 }}
          label='Pendiente de pago'
          variant='filled'
          color='error'
          icon={<CreditCardOutlined />}
        />
      )}

      <Grid container>
        <Grid item xs={12} sm={7}>
          {/* Cart List */}
          <CartList products={order.orderItems} />
        </Grid>
        <Grid item xs={12} sm={5}>
          <Card>
            <CardContent>
              <Typography variant='h2' component='h2'>
                Resumen ({order.numberOfItems} producto
                {order.numberOfItems > 1 ? 's' : ''})
              </Typography>
              <Divider sx={{ my: 1 }} />
              <Box display='flex' justifyContent='space-between'>
                <Typography variant='subtitle1'>
                  Dirección de entrega
                </Typography>
              </Box>

              <Typography>
                {shippingAddress.firstName} {shippingAddress.lastName}
              </Typography>
              <Typography>
                {shippingAddress.address}{' '}
                {shippingAddress.address2 && shippingAddress.address2}
              </Typography>
              <Typography>C.P. {shippingAddress.zip}</Typography>
              <Typography>{shippingAddress.city}</Typography>
              <Typography>
                {
                  countries.find((c) => c.code === shippingAddress.country)
                    ?.name
                }
              </Typography>
              <Typography>{shippingAddress.phone}</Typography>

              <Divider sx={{ my: 1 }} />

              {/* Order summary */}
              <OrderSummary
                orderSummary={{
                  numberOfItems: order.numberOfItems,
                  subTotal: order.subTotal,
                  tax: order.tax,
                  total: order.total,
                }}
              />
              <Box
                display='flex'
                flexDirection='column'
                sx={{
                  mt: 3,
                }}>
                {order.isPaid ? (
                  <Chip
                    sx={{ mb: 2 }}
                    label='Orden ya fue pagada'
                    variant='filled'
                    color='success'
                    icon={<CreditScoreOutlined />}
                  />
                ) : (
                  <>
                    <Typography
                      variant='h4'
                      component='h4'
                      fontWeight={600}
                      sx={{ mb: 5 }}>
                      Pagar
                    </Typography>
                    <NextLink href='/checkout' passHref>
                      <Button
                        color='secondary'
                        variant='contained'
                        className='circular-btn'
                        fullWidth>
                        Pagar
                      </Button>
                    </NextLink>
                  </>
                )}
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </ShopLayout>
  );
};

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

export const getServerSideProps: GetServerSideProps = async ({
  req,
  query,
}) => {
  // const { data } = await  // your fetch function here
  const { id = '' } = query;
  const session: any = await getSession({ req });

  if (!session) {
    return {
      redirect: {
        destination: `/auth/login?path=/orders/${id}`,
        permanent: false,
      },
    };
  }

  const order = await dbOrders.getOrderById(id.toString());

  if (!order) {
    return {
      redirect: {
        destination: '/orders/history',
        permanent: false,
      },
    };
  }

  if (order.user !== session.user._id) {
    return {
      redirect: {
        destination: '/orders/history',
        permanent: false,
      },
    };
  }
  // console.log(order);

  return {
    props: {
      order,
    },
  };
};

export default OrderPage;
