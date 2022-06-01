import React from 'react';
import { ShopLayout } from '../../components/layouts';
import NextLink from 'next/link';
import {
  Typography,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Button,
} from '@mui/material';

const AddressPage = () => {
  return (
    <ShopLayout
      title={'Dirección'}
      pageDescription={'Confirmar dirección del destino'}>
      <Typography variant='h1' component='h1'>
        Dirección
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField label='Nombre' variant='filled' fullWidth />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField label='Apellido' variant='filled' fullWidth />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField label='Dirección' variant='filled' fullWidth />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField label='Dirección 2' variant='filled' fullWidth />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField label='Código postal' variant='filled' fullWidth />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField label='Ciudad' variant='filled' fullWidth />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel>País</InputLabel>
            <Select variant='filled' label='País' value={1}>
              <MenuItem value={1}> México </MenuItem>
              <MenuItem value={2}> Argentina </MenuItem>
              <MenuItem value={3}> Brasil </MenuItem>
              <MenuItem value={4}> Chile </MenuItem>
              <MenuItem value={5}> Colombia </MenuItem>
              <MenuItem value={6}> Uruguay </MenuItem>
              <MenuItem value={7}> Venezuela </MenuItem>
              <MenuItem value={8}> Perú </MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField label='Teléfono' variant='filled' fullWidth />
        </Grid>
      </Grid>

      <Box sx={{ mt: 5 }} display='flex' justifyContent='center'>
        <NextLink href='/checkout/summary'>
          <Button
            color='secondary'
            // variant='contained'
            className='circular-btn'
            size='large'>
            Revisar pedido
          </Button>
        </NextLink>
      </Box>
    </ShopLayout>
  );
};

export default AddressPage;
