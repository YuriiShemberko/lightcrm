import { Alert } from '@mui/material';

export const CallEmptyState = () => (
  <Alert sx={{ mb: 2 }} severity="info">
    Відсутні контакти для дзвінка у черзі
  </Alert>
);
