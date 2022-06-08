import React from 'react';
import { Box, Typography } from '@mui/material';
import { NextPage, GetServerSideProps } from 'next';
import { ShopLayout } from '../../components/layouts';
import { ProductList } from '../../components/products';
import { dbProducts } from '../../database';
import { IProduct } from '../../interfaces';

interface Props {
  products: IProduct[];
  foundProducts: boolean;
  query: string;
}

const SearchPage: NextPage<Props> = ({ products, foundProducts, query }) => {
  return (
    <ShopLayout
      title={'Teslo-Shop - Home'}
      pageDescription={'Encuentra los mejores productos de Teslo aqui'}>
      <Typography variant='h1' component='h1'>
        Buscar Productos
      </Typography>
      {foundProducts ? (
        <Typography variant='h2' component='h2' textTransform='capitalize'>
          Término: {query}
        </Typography>
      ) : (
        <Box display='flex'>
          <Typography variant='h2' component='h2' sx={{ mb: 1 }}>
            No encontramos ningún producto
          </Typography>
          <Typography
            variant='h2'
            component='h2'
            color='secondary'
            sx={{ mb: 1, ml: 1 }}
            textTransform='capitalize'>
            {query}
          </Typography>
        </Box>
      )}
      <ProductList products={products} />
    </ShopLayout>
  );
};

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  // const { data } = await  // your fetch function here
  const { query = '' } = params as { query: string };

  if (query.length === 0)
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };

  let products = await dbProducts.getProductsByTerm(query);
  const foundProducts: boolean = products.length > 0;
  //   todo: return another products if products is empty

  if (!foundProducts) {
    products = await dbProducts.getAllProducts();
  }

  return {
    props: {
      products,
      foundProducts,
      query,
    },
  };
};

export default SearchPage;
