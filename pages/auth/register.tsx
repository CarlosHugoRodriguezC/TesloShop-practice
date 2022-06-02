import React from 'react';
import { AuthLayout } from '../../components/layouts';
import { Box, Button, Grid, Link, TextField, Typography } from '@mui/material';
import NextLink from 'next/link';

const RegisterPage = () => {
  return (
    <AuthLayout title='Teslo - Login'>
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
          </Grid>

          <Grid item xs={12}>
            <TextField label='Nombre Completo' variant='filled' fullWidth />
          </Grid>
          <Grid item xs={12}>
            <TextField label='Correo' variant='filled' fullWidth />
          </Grid>
          <Grid item xs={12}>
            <TextField label='Contraseña' type='password' variant='filled' fullWidth />
          </Grid>
          <Grid item xs={12}>
            <Button color='secondary'  variant='contained' className='circular-btn' fullWidth>
              Crear
            </Button>
          </Grid>
          <Grid item xs={12} display='flex' justifyContent='flex-end'>
            <NextLink href='/auth/login' passHref>
              <Link>¿Ya tienes cuenta?</Link>
            </NextLink>
          </Grid>
        </Grid>
      </Box>
    </AuthLayout>
  );
};

export default RegisterPage;
