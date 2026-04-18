import { Alert } from '@mui/material';

export const CallError = ({ error }: { error: string }) => (
  <Alert severity="error">{error}</Alert>
);
