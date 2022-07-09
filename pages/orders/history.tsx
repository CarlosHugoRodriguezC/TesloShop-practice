import React, { useEffect, useState } from 'react';
import { ShopLayout } from '../../components/layouts';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { Typography, Grid, Chip, Link } from '@mui/material';
import NextLink from 'next/link';
import { GetServerSideProps, NextPage } from 'next';
import { getSession } from 'next-auth/react';
import { dbOrders } from '../../database';
import { IOrder } from '../../interfaces';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'Order ID', width: 100 },
  {
    field: 'fullname',
    headerName: 'Nombre completo',
    width: 300,
    sortable: false,
  },
  {
    field: 'paid',
    headerName: 'Pagada',
    description: 'Muestra información de si la orden ya esta pagada',
    width: 200,
    renderCell: ({ row: { paid } }: GridValueGetterParams) => {
      return (
        <Chip
          color={paid ? 'success' : 'error'}
          label={paid ? 'Pagado' : 'No Pagado'}
          variant='filled'
        />
      );
    },
  },

  {
    field: 'order',
    headerName: 'Ver orden',
    width: 200,
    sortable: false,
    renderCell: ({ row: { orderId } }: GridValueGetterParams) => {
      return (
        <NextLink href={`/orders/${orderId}`} passHref>
          <Link underline='always'>Ir a la orden</Link>
        </NextLink>
      );
    },
  },
];

// const rows: any[] = [
//   {
//     id: '1',
//     paid: false,
//     fullname: 'Juan Perez',
//   },
//   {
//     id: '2',
//     paid: true,
//     fullname: 'Pedro Perez',
//   },
//   {
//     id: '3',
//     paid: false,
//     fullname: 'Juan Perez',
//   },
//   {
//     id: '4',
//     paid: true,
//     fullname: 'Pedro Perez',
//   },
// ];

interface Props {
  id: string;
  orders: IOrder[];
}
const HistoryPage: NextPage<Props> = ({ orders }) => {
  const rows = orders.map((order, index) => ({
    id: index + 1,
    paid: order.isPaid,
    fullname: `${order.shippingAddress.firstName} ${order.shippingAddress.lastName}`,
    orderId: order._id!,
  }));
  // const [rows, setRows] = useState<
  //   { id: number; paid: boolean; fullname: string; orderId: string }[]
  // >([]);

  // useEffect(() => {
  //   setRows(
  //     orders.map((order, index) => ({
  //       id: index  + 1 ,
  //       paid: order.isPaid,
  //       fullname: `${order.shippingAddress.firstName} ${order.shippingAddress.lastName}`,
  //       orderId: order._id!,
  //     }))
  //   );
  // }, []);

  return (
    <ShopLayout
      title={'Historial de ordenes'}
      pageDescription={'Historial de ordenes del cliente'}>
      <Typography variant='h1' component='h1'>
        Historial de ordenes
      </Typography>

      <Grid container>
        <Grid item xs={12} sx={{ height: 650, width: '100%' }}>
          <DataGrid
            columns={columns}
            rows={rows}
            pageSize={10}
            rowsPerPageOptions={[10]}
          />
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
  const session: any = await getSession({ req });

  if (!session) {
    return {
      redirect: {
        destination: '/auth/login?path=/orders/history',
        permanent: false,
      },
    };
  }

  const orders = await dbOrders.getOrdersByUser(session.user._id);

  return {
    props: {
      id: session.user._id,
      orders,
    },
  };
};

export default HistoryPage;
