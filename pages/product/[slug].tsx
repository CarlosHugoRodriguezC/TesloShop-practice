import { useState, useContext } from 'react';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';

import { Box, Button, Chip, Grid, Typography } from '@mui/material';
import { ShopLayout } from '../../components/layouts';
import {
  ProductSizeSelector,
  ProductSlideShow,
} from '../../components/products';
import { ItemCounter } from '../../components/ui';
import { dbProducts } from '../../database';
import { ICartProduct, IProduct } from '../../interfaces';
import { ISizes } from '../../interfaces/products';
import { CartContext } from '../../context/';
import { useRouter } from 'next/router';

// const product = initialData.products[0];
interface Props {
  product: IProduct;
}

const ProductPage: NextPage<Props> = ({ product }) => {
  const router = useRouter();
  const { addProductToCart } = useContext(CartContext);
  const [tempCartProduct, setTempCartProduct] = useState<ICartProduct>({
    _id: product._id,
    image: product.images[0],
    price: product.price,
    size: undefined,
    slug: product.slug,
    title: product.title,
    gender: product.gender,
    quantity: 1,
  });

  const selectedSize = (size: ISizes) => {
    setTempCartProduct((current) => ({ ...current, size }));
  };
  const onUpdatedValue = (value: number) => {
    // console.log(value, product.inStock);
    setTempCartProduct((current) => ({ ...current, quantity: value }));
  };
  const onAddProduct = () => {
    // console.log(tempCartProduct);
    if (!tempCartProduct.size) return;
    addProductToCart(tempCartProduct);
    router.push('/cart');
  };

  return (
    <ShopLayout title={product.title} pageDescription={product.description}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={7}>
          <ProductSlideShow images={product.images} />
        </Grid>
        <Grid item xs={12} sm={5}>
          <Box display='flex' flexDirection='column'>
            <Typography variant='h4' component='h1'>
              {product.title}
            </Typography>
            <Typography variant='subtitle1' component='h2'>
              ${product.price}
            </Typography>

            <Box sx={{ my: 2 }}>
              <Typography variant='subtitle2'>Cantidad</Typography>
              <ItemCounter
                value={tempCartProduct.quantity}
                onUpdatedValue={onUpdatedValue}
                minValue={1}
                maxValue={product.inStock}
              />
              <ProductSizeSelector
                selectedSize={tempCartProduct.size}
                sizes={product.sizes}
                onSelectedSize={(size) => {
                  selectedSize(size);
                }}
              />
            </Box>

            {product.inStock > 0 ? (
              <Button
                onClick={onAddProduct}
                color='secondary'
                variant='contained'
                disabled={!tempCartProduct.size}
                className='circular-btn'>
                {tempCartProduct.size
                  ? 'Agregar al carrito'
                  : 'Selecciona una talla'}
              </Button>
            ) : (
              <Chip color='error' variant='outlined' label='Sin Stock' />
            )}

            {/* <Chip label='No hay disponibles' color='error' variant="outlined" /> */}

            <Box sx={{ mt: 3 }}>
              <Typography variant='subtitle2'>Descripción</Typography>
              <Typography variant='body2'>{product.description}</Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ShopLayout>
  );
};

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time
// Mo usar solo example
// export const getServerSideProps: GetServerSideProps = async ({ params }) => {
//   // const { data } = await  // your fetch function here
//   const { slug } = params as { slug: string };
//   const product = await dbProducts.dbProduct(slug as string);

//   if (!product) {
//     return {
//       redirect: {
//         destination: '/',
//         permanent: false,
//       },
//     };
//   }

//   return {
//     props: {
//       product,
//     },
//   };
// };

// You should use getStaticPaths if you’re statically pre-rendering pages that use dynamic routes

export const getStaticPaths: GetStaticPaths = async (ctx) => {
  const slugs = await dbProducts.getAllProductSlugs();

  return {
    paths: slugs.map(({ slug }) => ({ params: { slug } })),
    fallback: 'blocking',
  };
};

// You should use getStaticProps when:
//- The data required to render the page is available at build time ahead of a user’s request.
//- The data comes from a headless CMS.
//- The data can be publicly cached (not user-specific).
//- The page must be pre-rendered (for SEO) and be very fast — getStaticProps generates HTML and JSON files, both of which can be cached by a CDN for performance.

export const getStaticProps: GetStaticProps = async ({ params }) => {
  // your fetch function here
  const { slug = '' } = params as { slug: string };
  const product = await dbProducts.getProductBySlug(slug);
  //  console.log(product);
  if (!product) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: {
      product,
    },
    // revalidate after 24 hours
    revalidate: 60 * 60 * 24,
  };
};
export default ProductPage;
