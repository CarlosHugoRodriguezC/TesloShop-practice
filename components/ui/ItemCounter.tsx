import { AddCircleOutline, RemoveCircleOutline } from '@mui/icons-material';
import { Box, IconButton, Typography } from '@mui/material';
import { FC } from 'react';

interface Props {
  maxValue: number;
  minValue?: number;
  onUpdatedValue: (value: number) => void;
  value: number;
}

export const ItemCounter: FC<Props> = ({
  maxValue,
  minValue = 1,
  onUpdatedValue,
  value,
}) => {
  const handleChangeValue = (increment: number) => {
    const newValue = value + increment;
    if (newValue >= minValue && newValue <= maxValue) {
      onUpdatedValue(newValue);
    }
  };

  return (
    <Box display={'flex'} alignItems={'center'}>
      <IconButton onClick={() => handleChangeValue(-1)}>
        <RemoveCircleOutline />
      </IconButton>
      <Typography
        sx={{
          width: '3rem',
          textAlign: 'center',
        }}>
        {value}
      </Typography>
      <IconButton onClick={() => handleChangeValue(1)}>
        <AddCircleOutline />
      </IconButton>
    </Box>
  );
};
