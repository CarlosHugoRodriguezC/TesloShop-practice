
import { Box, CircularProgress, Typography } from '@mui/material';

export const FullScreenLoading = () => {
  return (
    <Box
      display='flex'
      justifyContent='center'
      alignItems='center'
      height='calc(100vh - 200px)'
      flexDirection='column'>
      <Typography sx={{marginBottom: 2}}>Cargando ...</Typography>
      <CircularProgress thickness={2} />
    </Box>
  );
};
