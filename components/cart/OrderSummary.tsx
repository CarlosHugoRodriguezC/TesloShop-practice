import { Grid, Typography } from '@mui/material';
import { FC, useContext } from 'react';
import { CartContext } from '../../context';
import {currency} from '../../utils';

interface Props {}

export const OrderSummary: FC<Props> = () => {
  const { numberOfItems, subTotal, tax, total } = useContext(CartContext);
  const taxRate = Number(process.env.NEXT_PUBLIC_TAX_RATE || 0);
  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <Typography>No. Productos</Typography>
      </Grid>
      <Grid item xs={6} display='flex' justifyContent='end'>
        <Typography>
          {numberOfItems} producto{numberOfItems > 1 && 's'}
        </Typography>
      </Grid>

      <Grid item xs={6}>
        <Typography>Subtotal</Typography>
      </Grid>
      <Grid item xs={6} display='flex' justifyContent='end'>
        <Typography fontWeight={500}>{currency.format(subTotal, 'USD')}</Typography>
      </Grid>

      <Grid item xs={6}>
        <Typography>Impuestos ({taxRate * 100}%)</Typography>
      </Grid>
      <Grid item xs={6} display='flex' justifyContent='end'>
        <Typography fontWeight={500}>{currency.format(tax, 'USD')}</Typography>
      </Grid>

      <Grid item xs={6}>
        <Typography variant='subtitle1'>Total:</Typography>
      </Grid>
      <Grid item xs={6} display='flex' justifyContent='end'>
        <Typography variant='subtitle1' fontWeight={500}>
          {currency.format(total, 'USD')}
        </Typography>
      </Grid>
    </Grid>
  );
};
