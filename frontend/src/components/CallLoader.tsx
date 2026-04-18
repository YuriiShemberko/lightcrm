import { Box, CircularProgress } from '@mui/material';

export const CallLoader = () => (
  <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
    <CircularProgress />
  </Box>
);
