import React, { useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import { ShopLayout } from '../../components/layouts';
import { countries } from '../../utils';
import {
  Typography,
  Grid,
  TextField,
  FormControl,
  MenuItem,
  Box,
  Button,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import Cookies from 'js-cookie';
import { CartContext } from '../../context';

type FormData = {
  firstName: string;
  lastName: string;
  address: string;
  address2?: string;
  zip: string;
  city: string;
  country: string;
  phone: string;
};

const getAddresFromCookies = (): FormData => {
  return {
    firstName: Cookies.get('firstName') || '',
    lastName: Cookies.get('lastName') || '',
    address: Cookies.get('address') || '',
    address2: Cookies.get('address2') || '',
    zip: Cookies.get('zip') || '',
    city: Cookies.get('city') || '',
    country: Cookies.get('country') || countries[0].code,
    phone: Cookies.get('phone') || '',
  };
};

const AddressPage = () => {
  const router = useRouter();
  const { updateAddress } = useContext(CartContext);
  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
  } = useForm<FormData>({
    defaultValues: getAddresFromCookies(),
  });

  const onSubmit = (data: FormData) => {
    updateAddress(data);
    router.push('/checkout/summary');
  };

  return (
    <ShopLayout
      title={'Dirección'}
      pageDescription={'Confirmar dirección del destino'}>
      <Typography variant='h1' component='h1'>
        Dirección
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              label='Nombre'
              variant='filled'
              fullWidth
              {...register('firstName', { required: 'El campo es requerido' })}
              error={errors.firstName !== undefined}
              helperText={errors.firstName && errors.firstName.message}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label='Apellido'
              variant='filled'
              fullWidth
              {...register('lastName', { required: 'El campo es requerido' })}
              error={errors.lastName !== undefined}
              helperText={errors.lastName && errors.lastName.message}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label='Dirección'
              variant='filled'
              fullWidth
              {...register('address', { required: 'El campo es requerido' })}
              error={errors.address !== undefined}
              helperText={errors.address && errors.address.message}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label='Dirección 2'
              variant='filled'
              fullWidth
              {...register('address2', { required: false })}
              error={errors.address2 !== undefined}
              helperText={errors.address2 && errors.address2.message}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label='Código postal'
              variant='filled'
              fullWidth
              {...register('zip', { required: 'El campo es requerido' })}
              error={errors.zip !== undefined}
              helperText={errors.zip && errors.zip.message}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label='Ciudad'
              variant='filled'
              fullWidth
              {...register('city', { required: 'El campo es requerido' })}
              error={errors.city !== undefined}
              helperText={errors.city && errors.city.message}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <TextField
                key={Cookies.get('country') || countries[0].code}
                select
                label='País'
                variant='filled'
                defaultValue={ Cookies.get('country') || countries[0].code}
                {...register('country', { required: 'El campo es requerido' })}
                error={errors.country !== undefined}>
                {countries.map((country, index) => (
                  <MenuItem key={country.code} value={country.code}>
                    {country.name}
                  </MenuItem>
                ))}
              </TextField>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label='Teléfono'
              variant='filled'
              fullWidth
              {...register('phone', { required: 'El campo es requerido' })}
              error={errors.phone !== undefined}
              helperText={errors.phone && errors.phone.message}
            />
          </Grid>
        </Grid>

        <Box sx={{ mt: 5 }} display='flex' justifyContent='center'>
          {/* <NextLink href='/checkout/summary'> */}
          <Button
            color='secondary'
            type='submit'
            className='circular-btn'
            size='large'>
            Revisar pedido
          </Button>
          {/* </NextLink> */}
        </Box>
      </form>
    </ShopLayout>
  );
};

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time
// import { GetServerSideProps } from 'next';
// import { jwt } from '../../utils';

// export const getServerSideProps: GetServerSideProps = async (ctx) => {
//   const { token = '' } = ctx.req.cookies;

//   let isValidToken = false;

//   try {
//     await jwt.isValid(token);
//     isValidToken = true;
//   } catch (error) {
//     isValidToken = false;
//   }

//   if (!isValidToken) {
//     return {
//       redirect: {
//         destination: '/auth/login?p=/checkout/address',
//         permanent: false,
//       },
//     };
//   }

//   return {
//     props: {},
//   };
// };

export default AddressPage;
