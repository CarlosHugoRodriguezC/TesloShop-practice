import React, { useEffect, useState } from 'react';
import { GetServerSideProps } from 'next';
import NextLink from 'next/link';
import { getSession, signIn, getProviders } from 'next-auth/react';
import {
  Box,
  Button,
  Chip,
  Divider,
  Grid,
  Link,
  TextField,
  Typography,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { AuthLayout } from '../../components/layouts';
import { validations } from '../../utils';
import { ErrorOutline } from '@mui/icons-material';
import { useRouter } from 'next/router';
import { useMemo } from 'react';

type FormData = {
  email: string;
  password: string;
};

const LoginPage = () => {
  // const { loginUser } = useContext(AuthContext);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>();

  const [showError, setShowError] = useState(false);

  const [providers, setProviders] = useState<any>({});

  useEffect(() => {
    getProviders().then((prov) => {
      setProviders(prov);
    });
  }, []);

  const registerPath = useMemo(
    () =>
      router.query.p
        ? `/auth/register?p=${router.query.p?.toString()}`
        : '/auth/register',
    [router.query]
  );

  const onLoginUser = async ({ email, password }: FormData) => {
    setShowError(false);
    // const isCorrectlyLogged = await loginUser(email, password);

    // if (!isCorrectlyLogged) {
    //   setShowError(true);
    //   setTimeout(() => setShowError(false), 3000);
    //   return;
    // }

    // const { query } = router;
    // const destination = query.p?.toString() || '/';
    // router.replace(destination);
    signIn('credentials', { email, password });
  };

  return (
    <AuthLayout title='Teslo - Login'>
      <form onSubmit={handleSubmit(onLoginUser)} noValidate>
        <Box
          sx={{
            width: '35rem',
            padding: '2rem 4rem',
          }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant='h1' component='h1'>
                Iniciar Sesión
              </Typography>

              <Chip
                label='No se encontró una cuenta con esos datos'
                color='error'
                icon={<ErrorOutline />}
                className='fadeIn'
                sx={{
                  display: showError ? 'flex' : 'none',
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                type='email'
                label='Correo'
                variant='filled'
                fullWidth
                {...register('email', {
                  required: 'Este Campo es requerido',
                  validate: validations.isEmail,
                })}
                error={!!errors.email}
                helperText={errors.email?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label='Contraseña'
                type='password'
                variant='filled'
                fullWidth
                {...register('password', {
                  required: 'Este Campo es requerido',
                  minLength: {
                    value: 6,
                    message: 'La contraseña debe tener al menos 6 caracteres',
                  },
                })}
                error={!!errors.password}
                helperText={errors.password?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                className='circular-btn'
                color='secondary'
                fullWidth
                size='large'
                type='submit'
                variant='contained'>
                Ingresar
              </Button>
            </Grid>
            <Grid item xs={12} display='flex' justifyContent='flex-end'>
              <NextLink href={registerPath} passHref>
                <Link>¿No tienes cuenta?</Link>
              </NextLink>
            </Grid>
            <Grid
              item
              xs={12}
              display='flex'
              justifyContent='center'
              flexDirection='column'>
              <Divider
                sx={{
                  width: '100%',
                  mb: 2,
                }}
              />
              {Object.values(providers).map(
                (provider: any) =>
                  provider.id !== 'credentials' && (
                    <Button
                      key={provider.id}
                      variant='outlined'
                      fullWidth
                      color='primary'
                      size='large'
                      sx={{ mb: 1, borderRadius: 50 }}
                      onClick={() => signIn(provider.id)}>
                      {provider.name}
                    </Button>
                  )
              )}
            </Grid>
          </Grid>
        </Box>
      </form>
    </AuthLayout>
  );
};

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

export const getServerSideProps: GetServerSideProps = async ({
  req,
  query,
}) => {
  // const { data } = await  // your fetch function here
  const session = await getSession({ req });

  const { p = '/' } = query;

  if (session) {
    return {
      redirect: {
        destination: p.toString(),
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

export default LoginPage;
