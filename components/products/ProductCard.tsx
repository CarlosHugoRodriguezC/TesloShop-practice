import {
  Grid,
  Card,
  CardActionArea,
  CardMedia,
  Typography,
  Box,
  Link,
  Chip,
} from '@mui/material';
import { IProduct } from '../../interfaces';
import { FC, useMemo, useState } from 'react';
import NextLink from 'next/link';

interface Props {
  product: IProduct;
}

export const ProductCard: FC<Props> = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const productImage = useMemo(
    () =>
      isHovered
        ? `${product.images[1]}`
        : `${product.images[0]}`,
    [isHovered, product.images]
  );

  return (
    <Grid
      item
      xs={6}
      sm={4}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}>
      <Card>
        <NextLink href={`/product/${product.slug}`} passHref prefetch={false}>
          <Link>
            <CardActionArea>
              {product.inStock === 0 && (
                <Chip
                  color='primary'
                  label='Sin Stock'
                  sx={{
                    position: 'absolute',
                    zIndex: 9,
                    top: '10px',
                    right: '10px',
                  }}
                />
              )}
              <CardMedia
                className='fadeIn'
                component={'img'}
                image={productImage}
                alt={product.title}
                onLoad={() => setIsImageLoaded(true)}
              />
            </CardActionArea>
          </Link>
        </NextLink>
      </Card>
      <Box
        sx={{ mt: 1, display: isImageLoaded ? 'block' : 'none' }}
        className='fadeIn'>
        <Typography fontWeight={700}>{product.title}</Typography>
        <Typography fontWeight={500}>${product.price}</Typography>
      </Box>
    </Grid>
  );
};
