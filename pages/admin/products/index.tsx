import { AddOutlined, CategoryOutlined } from '@mui/icons-material';
import React, { useEffect, useState } from 'react';
import { AdminLayout } from '../../../components/layouts';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import useSWR from 'swr';
import { CardMedia, Grid, Typography, Link, Box, Button } from '@mui/material';
import { IProduct } from '../../../interfaces';

import NextLink from 'next/link';

const ProductsPage = () => {
  const { data, error } = useSWR<IProduct[]>('/api/admin/products/');
  const [products, setProducts] = useState<IProduct[]>([]);

  useEffect(() => {
    if (data) {
      setProducts(data);
    }
  }, [data]);

  if (!error && !data) {
    return <div>Loading...</div>;
  }

  if (error) {
    return (
      <Typography>Ocurrio un error al consultar la información</Typography>
    );
  }

  const columns: GridColDef[] = [
    {
      field: 'img',
      headerName: 'Imagen',
      renderCell: ({ row }: GridValueGetterParams) => (
        <a href={`/product/${row.slug}`} target='_blank' rel='noreferrer'>
          <CardMedia
            image={`${row.img}`}
            className='fadeIn'
            component='img'
          />
        </a>
      ),
    },
    {
      field: 'title',
      headerName: 'Nombre',
      width: 250,
      renderCell: ({ row }: GridValueGetterParams) => (
        <NextLink href={`/admin/products/${row.slug}`} passHref>
          <Link>{row.title}</Link>
        </NextLink>
      ),
    },
    { field: 'gender', headerName: 'Genero', width: 250 },
    { field: 'type', headerName: 'Tipo', width: 250 },
    { field: 'inStock', headerName: 'Inventario', width: 250 },
    { field: 'price', headerName: 'Precio', width: 250 },
    { field: 'sizes', headerName: 'Tallas', width: 250 },
  ];

  const rows = products.map((product) => ({
    id: product._id,
    slug: product.slug,
    img: `${product.images[0]}`,
    title: product.title,
    gender: product.gender,
    type: product.type,
    inStock: product.inStock,
    price: product.price,
    sizes: product.sizes.join(', '),
  }));

  return (
    <AdminLayout
      title={'Productos'}
      subtitle={'Mantenimiento de productos'}
      icon={<CategoryOutlined />}>
      <Box
        display='flex'
        justifyContent='flex-end'
        sx={{
          mb: 2,
        }}>
        <Button
          startIcon={<AddOutlined />}
          color='secondary'
          href='/admin/products/new'
          size='large'>
          Crear Producto
        </Button>
      </Box>
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

export default ProductsPage;
