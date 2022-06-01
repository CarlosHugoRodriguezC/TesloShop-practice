import {
  Box,
  CardActionArea,
  CardMedia,
  Grid,
  Link,
  Typography,
} from '@mui/material';
import { FC } from 'react';
import { initialData } from '../../database/products';
import NextLink from 'next/link';
import { ItemCounter } from '../ui';
import { Button } from '@mui/material';

interface Props {
  editable?: boolean;
}

const ProductsInCard = [
  initialData.products[0],
  initialData.products[1],
  initialData.products[2],
];

export const CartList: FC<Props> = ({ editable = false }) => {
  return (
    <>
      {ProductsInCard.map((product, index) => (
        <Grid container key={product.slug} spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={3}>
            <NextLink href={`/product/${product.slug}`} passHref>
              <Link>
                <CardActionArea>
                  <CardMedia
                    image={`/products/${product.images[0]}`}
                    component='img'
                    sx={{ borderRadius: 5 }}
                  />
                </CardActionArea>
              </Link>
            </NextLink>
          </Grid>
          <Grid item xs={7}>
            <Box display='flex' flexDirection='column'>
              <Typography variant='body1'> {product.title} </Typography>
              <Typography variant='body2'>
                Talla: <strong>M</strong>
              </Typography>
              {editable ? (
                <ItemCounter />
              ) : (
                <Typography variant='h6'>3 items</Typography>
              )}
            </Box>
          </Grid>
          <Grid
            item
            xs={2}
            display='flex'
            alignItems='center'
            flexDirection='column'>
            <Typography variant='subtitle1'>${product.price}</Typography>
            <Button color='secondary' variant='text'>
              Remover
            </Button>
          </Grid>
        </Grid>
      ))}
    </>
  );
};
