import { Typography } from '@mui/material';
import React from 'react';
import { ShopLayout } from '../../components/layouts';
import { ProductList } from '../../components/products';
import { FullScreenLoading } from '../../components/ui';
import { useProducts } from '../../hooks';

const WomenPage = () => {
  const { products, isLoading } = useProducts('/products?gender=women');
  return (
    <ShopLayout
      title={'Teslo-Shop - Mujeres'}
      pageDescription={'Encuentra los mejores productos de Teslo aqui para Mujeres'}>
      <Typography variant='h1' component='h1'>
        Tienda
      </Typography>
      <Typography variant='h2' component='h2'>
        Todos los productos de mujeres
      </Typography> 

      {isLoading ? <FullScreenLoading /> : <ProductList products={products} />}
    </ShopLayout>
  );
};

export default WomenPage;
