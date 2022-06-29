import React, { useMemo, useState } from 'react';
import NextLink from 'next/link';
import {
  Box,
  Button,
  Chip,
  Grid,
  Link,
  TextField,
  Typography,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { AuthLayout } from '../../components/layouts';
import { validations } from '../../utils';
import { ErrorOutline } from '@mui/icons-material';
import { useContext } from 'react';
import { AuthContext } from '../../context';
import { useRouter } from 'next/router';

type FormData = {
  name: string;
  email: string;
  password: string;
};

const RegisterPage = () => {
  const { registerUser } = useContext(AuthContext);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>();
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const loginPath = useMemo(
    () => (router.query.p ? `/auth/login?p=${router.query.p?.toString()}` : '/auth/login'),
    [router.query]
  );

  const onRegister = async (registerData: FormData) => {
    setShowError(false);

    const { name, email, password } = registerData;
    const {hasError, message} = await registerUser(name, email, password);

    if (hasError) {
      setErrorMessage(message!);
      setShowError(true);
      setTimeout(() => setShowError(false), 3000);
      return;
    }

    const { query } = router;
    const destination = query.p?.toString() || '/';
    router.replace(destination);
  };

  return (
    <AuthLayout title='Teslo - Register'>
      <form onSubmit={handleSubmit(onRegister)}>
        <Box
          sx={{
            width: '40rem',
            padding: '2rem 4rem',
          }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant='h1' component='h1'>
                Crear cuenta
              </Typography>
              <Chip
                className='fadeIn'
                label={errorMessage}
                icon={<ErrorOutline />}
                color='error'
                sx={{ display: showError ? 'flex' : 'none' }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label='Nombre Completo'
                variant='filled'
                {...register('name', {
                  required: 'El nombre es requerido',
                })}
                error={errors.name !== undefined}
                helperText={errors.name && errors.name.message}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label='Correo'
                variant='filled'
                {...register('email', {
                  required: 'El correo es requerido',
                  validate: validations.isEmail,
                })}
                error={errors.email !== undefined}
                helperText={errors.email && errors.email.message}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label='Contraseña'
                type='password'
                variant='filled'
                fullWidth
                {...register('password', {
                  required: 'La contraseña es requerida',
                  minLength: {
                    value: 6,
                    message: 'La contraseña debe tener al menos 6 caracteres',
                  },
                })}
                error={errors.password !== undefined}
                helperText={errors.password && errors.password.message}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                color='secondary'
                variant='contained'
                className='circular-btn'
                size='large'
                type='submit'
                fullWidth>
                Crear
              </Button>
            </Grid>
            <Grid item xs={12} display='flex' justifyContent='flex-end'>
              <NextLink href={loginPath} passHref>
                <Link>¿Ya tienes cuenta?</Link>
              </NextLink>
            </Grid>
          </Grid>
        </Box>
      </form>
    </AuthLayout>
  );
};

export default RegisterPage;
