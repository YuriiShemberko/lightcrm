import { Typography } from '@mui/material';

export const CallInfo = ({
  contact,
}: {
  contact: { name: string; phone: string };
}) => (
  <>
    <Typography variant="body1" sx={{ mb: 1 }}>
      <strong>Ім'я:</strong> {contact.name}
    </Typography>
    <Typography variant="body1" sx={{ mb: 2 }}>
      <strong>Телефон:</strong> {contact.phone}
    </Typography>
  </>
);
