import { Grid, Typography } from '@mui/material';
import { FC } from 'react';

interface Props {}

export const OrderSummary: FC<Props> = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <Typography>No. Productos</Typography>
      </Grid>
      <Grid item xs={6} display='flex' justifyContent='end'>
        <Typography>3</Typography>
      </Grid>

      <Grid item xs={6}>
        <Typography>Subtotal</Typography>
      </Grid>
      <Grid item xs={6} display='flex' justifyContent='end'>
        <Typography fontWeight={500}>$155.33</Typography>
      </Grid>

      <Grid item xs={6}>
        <Typography>Impuestos (15%)</Typography>
      </Grid>
      <Grid item xs={6} display='flex' justifyContent='end'>
        <Typography fontWeight={500}>$35.34</Typography>
      </Grid>


      <Grid item xs={6}>
        <Typography variant='subtitle1'>Total:</Typography>
      </Grid>
      <Grid item xs={6} display='flex' justifyContent='end'>
        <Typography variant='subtitle1' fontWeight={500}>$200.00</Typography>
      </Grid>

    </Grid>
  );
};
