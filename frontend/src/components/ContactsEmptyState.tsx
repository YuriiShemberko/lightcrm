import React from 'react';
import { Paper, Typography } from '@mui/material';

const ContactsEmptyState: React.FC = () => {
  return (
    <Paper sx={{ p: 4, textAlign: 'center' }}>
      <Typography variant="h6" color="text.secondary">
        Немає контактів
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
        Контакти ще не додані до системи
      </Typography>
    </Paper>
  );
};

export default ContactsEmptyState;
