import {
  Typography,
  Grid,
  Card,
  CardContent,
  Divider,
  Box,
  Chip,
} from '@mui/material';
import React, { useState } from 'react';

import {  CreditCardOutlined, CreditScoreOutlined, ShoppingBagOutlined } from '@mui/icons-material';
import { GetServerSideProps, NextPage } from 'next';


import { useRouter } from 'next/router';
import { tesloApi } from '../../../api';
import { CartList, OrderSummary } from '../../../components/cart';
import { AdminLayout, ShopLayout } from '../../../components/layouts';
import { dbOrders } from '../../../database';
import { IOrder } from '../../../interfaces';
import { countries } from '../../../utils';
export type OrderResponseBody = {
  id: string;
  status:
    | 'COMPLETED'
    | 'SAVED'
    | 'APPROVED'
    | 'VOIDED'
    | 'PAYER_ACTION_REQUIRED';
};
interface Props {
  order: IOrder;
}

const OrderPage: NextPage<Props> = ({
  order: { shippingAddress, ...order },
}) => {
  const router = useRouter();

  

  return (
    <AdminLayout
      title={'Resumen de la orden '}
      subtitle={`Orden ${order._id}`}
      icon={<ShoppingBagOutlined />}>
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
                true
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
               

                <Box
                  className='fadeIn'
                  flexDirection='column'
                  sx={{
                    display: 'flex',
                    flex: 1,
                  }}>
                  {order.isPaid && (
                    <Chip
                      sx={{ mb: 2 }}
                      label='Orden ya fue pagada'
                      variant='filled'
                      color='success'
                      icon={<CreditScoreOutlined />}
                    />
                  )}
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </AdminLayout>
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

  const order = await dbOrders.getOrderById(id.toString());

  if (!order) {
    return {
      redirect: {
        destination: '/admin/orders',
        permanent: false,
      },
    };
  }

  return {
    props: {
      order,
    },
  };
};

export default OrderPage;
