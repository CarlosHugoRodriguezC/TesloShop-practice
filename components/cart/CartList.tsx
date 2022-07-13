import {
  Box,
  CardActionArea,
  CardMedia,
  Grid,
  Link,
  Typography,
} from '@mui/material';
import { FC, useContext } from 'react';
import NextLink from 'next/link';
import { ItemCounter } from '../ui';
import { Button } from '@mui/material';
import { CartContext } from '../../context';
import { ICartProduct } from '../../interfaces';
import { IOrderItem } from '../../interfaces/order';

interface Props {
  editable?: boolean;
  products?: IOrderItem[];
}

// const ProductsInCard = [
//   initialData.products[0],
//   initialData.products[1],
//   initialData.products[2],
// ];

export const CartList: FC<Props> = ({ editable = false, products }) => {
  const {
    cart,
    updateQuantityOfProduct,
    removeProductFromCart: onRemoveCartProduct,
  } = useContext(CartContext);

  const onNewCartQuantityValue = (product: ICartProduct, quantity: number) => {
    product.quantity = quantity;
    updateQuantityOfProduct(product);
  };

  const productsToShow = products || cart;

  return (
    <>
      {productsToShow.map((product, index) => (
        <Grid
          container
          key={product.slug + product.size}
          spacing={2}
          sx={{ mb: 3 }}>
          <Grid item xs={3}>
            <NextLink href={`/product/${product.slug}`} passHref>
              <Link>
                <CardActionArea>
                  <CardMedia
                    image={`${product.image}`}
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
                Talla: <strong>{product.size}</strong>
              </Typography>
              {editable ? (
                <ItemCounter
                  maxValue={10}
                  onUpdatedValue={(value) => {
                    onNewCartQuantityValue(product, value);
                  }}
                  value={product.quantity}
                />
              ) : (
                <Typography variant='h6'>
                  {product.quantity} producto{product.quantity > 1 && 's'}
                </Typography>
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
            {editable && (
              <Button
                color='secondary'
                variant='text'
                onClick={() => onRemoveCartProduct(product)}>
                Remover
              </Button>
            )}
          </Grid>
        </Grid>
      ))}
    </>
  );
};
