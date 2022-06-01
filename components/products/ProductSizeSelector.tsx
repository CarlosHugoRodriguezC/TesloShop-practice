import { Button } from '@mui/material';
import { Box } from '@mui/system';
import { FC } from 'react';
import { ISizes } from '../../interfaces';
interface Props {
  selectedSize?: string;
  sizes: ISizes[];
}

export const ProductSizeSelector: FC<Props> = ({ selectedSize, sizes }) => {
  return (
    <Box>
      {sizes.map((size) => (
        <Button key={size} color='info' variant={ selectedSize === size ? 'contained': 'text' } size='small'>{size}</Button>
      ))}
    </Box>
  );
};
