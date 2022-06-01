import { Box } from '@mui/system';
import { ShopLayout } from '../../components/layouts/ShopLayout';
import { Link, Typography } from '@mui/material';
import { RemoveShoppingCartOutlined } from '@mui/icons-material';
import NextLink from 'next/link';

const EmptyPage = () => {
  return (
    <ShopLayout
      title={'Carrito Vacio'}
      pageDescription={'No hay artículos en el carrito de compras'}>
      <Box
        display={'flex'}
        justifyContent={'center'}
        alignItems={'center'}
        height='calc(100vh - 200px)'>
        <RemoveShoppingCartOutlined sx={{
            fontSize: '5rem',
        }} />
        <Box display={'flex'} flexDirection={'column'} alignItems={'center'}>
          <Typography>Su carrito esta vacio</Typography>
          <NextLink href={'/'} passHref>
            <Link typography={'h4'} color={'secondary'}>Regresar</Link>
          </NextLink>
        </Box>
      </Box>
    </ShopLayout>
  );
};

export default EmptyPage;
