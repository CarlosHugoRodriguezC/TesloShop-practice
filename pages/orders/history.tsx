import React from 'react';
import { ShopLayout } from '../../components/layouts';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { Typography, Grid, Chip, Link } from '@mui/material';
import NextLink from 'next/link';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'Order ID', width: 100 },
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
    field: 'fullname',
    headerName: 'Nombre completo',
    width: 300,
    sortable: false,
  },
  {
    field: 'order',
    headerName: 'Ver orden',
    width: 200,
    sortable: false,
    renderCell: ({ row: { id } }: GridValueGetterParams) => {
      return (
        <NextLink href={`/orders/${id}`} passHref>
          <Link underline='always'>Ir a la orden</Link>
        </NextLink>
      );
    },
  },
];

const rows: any[] = [
  {
    id: '1',
    paid: false,
    fullname: 'Juan Perez',
  },
  {
    id: '2',
    paid: true,
    fullname: 'Pedro Perez',
  },
  {
    id: '3',
    paid: false,
    fullname: 'Juan Perez',
  },
  {
    id: '4',
    paid: true,
    fullname: 'Pedro Perez',
  },
];

const HistoryPage = () => {
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

export default HistoryPage;
