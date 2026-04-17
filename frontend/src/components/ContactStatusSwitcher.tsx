import React from 'react';
import { Stack, FormControl, InputLabel, MenuItem, Select, type SelectChangeEvent, Typography } from '@mui/material';
import { type Contact } from '../types';

interface ContactStatusSwitcherProps {
  value?: Contact['status'] | null;
  onChange?: (status: Contact['status'] | null) => void;
}

const ContactStatusSwitcher: React.FC<ContactStatusSwitcherProps> = ({ value = null, onChange }) => {
  const handleChange = (event: SelectChangeEvent<string>) => {
    const selected = event.target.value as Contact['status'] | '';
    onChange?.(selected === '' ? null : selected);
  };

  return (
    <Stack direction="column" spacing={1} sx={{ mb: 2 }}>
      <Typography variant="subtitle2" component="div">
        Статус контакту
      </Typography>
      <FormControl size="small" fullWidth>
        <InputLabel id="contact-status-select-label">Статус</InputLabel>
        <Select
          labelId="contact-status-select-label"
          id="contact-status-select"
          value={value ?? ''}
          label="Статус"
          onChange={handleChange}
        >
          <MenuItem value="">Усі</MenuItem>
          <MenuItem value="new">Нові</MenuItem>
          <MenuItem value="called">Дзвонили</MenuItem>
          <MenuItem value="failed">Невдало</MenuItem>
          <MenuItem value="callback">Передзвонити</MenuItem>
        </Select>
      </FormControl>
    </Stack>
  );
};

export default ContactStatusSwitcher;
