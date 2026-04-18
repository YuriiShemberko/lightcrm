import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
} from '@mui/material';
import { validateName, validatePhone } from '../utils';

interface NewContactModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: { name: string; phone: string }) => void;
}

const NewContactModal: React.FC<NewContactModalProps> = ({
  open,
  onClose,
  onSubmit,
}) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [nameError, setNameError] = useState<string | null>(null);
  const [phoneError, setPhoneError] = useState<string | null>(null);

  useEffect(() => {
    if (!open) {
      setName('');
      setPhone('');
    }
  }, [open]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nErr = validateName(name);
    const pErr = validatePhone(phone);
    setNameError(nErr);
    setPhoneError(pErr);
    if (!nErr && !pErr) {
      onSubmit({ name, phone });
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle color="primary">Додати новий контакт</DialogTitle>
      <Box component="form" onSubmit={handleSubmit} noValidate>
        <DialogContent sx={{ pt: 1 }}>
          <Stack spacing={2}>
            <TextField
              label="Ім'я"
              value={name}
              onChange={(event) => {
                setName(event.target.value);
                if (nameError) setNameError(null);
              }}
              required
              fullWidth
              error={!!nameError}
              helperText={nameError}
            />
            <TextField
              label="Телефон"
              value={phone}
              onChange={(event) => {
                setPhone(event.target.value);
                if (phoneError) setPhoneError(null);
              }}
              required
              fullWidth
              error={!!phoneError}
              helperText={phoneError}
            />
          </Stack>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={onClose}>Скасувати</Button>
          <Button type="submit" variant="contained" disabled={!name || !phone}>
            Додати контакт
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
};

export default NewContactModal;
