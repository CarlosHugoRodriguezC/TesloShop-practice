import { Button } from '@mui/material';
import { Box } from '@mui/system';
import { FC } from 'react';
import { ISizes } from '../../interfaces';
interface Props {
  selectedSize?: string;
  sizes: ISizes[];
  onSelectedSize: (size: ISizes) => void;
}

export const ProductSizeSelector: FC<Props> = ({
  selectedSize,
  sizes,
  onSelectedSize,
}) => {
  return (
    <Box>
      {sizes.map((size) => (
        <Button
          key={size}
          color={selectedSize === size ? 'primary' : 'info'}
          size='small'
          onClick={() => onSelectedSize(size)}>
          {size}
        </Button>
      ))}
    </Box>
  );
};
