import { PeopleOutline } from '@mui/icons-material';
import React, { useEffect, useState } from 'react';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import useSWR from 'swr';
import { Chip, Grid, MenuItem, Select, Typography } from '@mui/material';
import { AdminLayout } from '../../../components/layouts';
import { IOrder, IUser } from '../../../interfaces';


const OrdersPage = () => {
  const { data, error } = useSWR<IOrder[]>('/api/admin/orders/');

  if (!error && !data) return <div>Loading...</div>;
  if (error)
    return <Typography>Ocurrio un error al obtener la información!</Typography>;

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'Order ID', width: 250 },
    { field: 'email', headerName: 'Email', width: 250 },
    { field: 'name', headerName: 'Nombre Completo', width: 300 },
    { field: 'total', headerName: 'Total', width: 300 },
    {
      field: 'isPaid',
      headerName: 'Pagada',
      width: 300,
      renderCell: ({ row }) =>
        row.isPaid ? (
          <Chip color='success' label='Pagada' />
        ) : (
          <Chip color='error' label='No Pagada' />
        ),
    },
    {
      field: 'noProducts',
      headerName: 'Mo. de productos',
      align: 'center',
    },
    {
      field: 'check',
      headerName: 'Ver ordern',
      renderCell: ({ row }) => (
        <a href={`/admin/orders/${row.id}`} target='_blank' rel='noreferrer'>
          Ver orden
        </a>
      ),
    },
    {
      field: 'createdAt',
      headerName: 'Fecha de creación',
      width: 300,
    }
  ];

  const rows = data!.map((order) => ({
    id: order._id,
    email: (order.user as IUser)?.email || '',
    name: `${order.shippingAddress.firstName} ${order.shippingAddress.lastName}`,
    total: order.total,
    isPaid: order.isPaid,
    noProducts: order.numberOfItems,
    createdAt: order.createdAt,
  }));

  return (
    <AdminLayout
      title={'Ordenes'}
      subtitle={'Mantenimiento de ordenes'}
      icon={<PeopleOutline />}>
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
    </AdminLayout>
  );
};

export default OrdersPage;
