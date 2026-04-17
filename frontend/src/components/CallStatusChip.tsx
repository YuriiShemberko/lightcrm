import React from 'react';
import { Chip } from '@mui/material';
import { type Contact } from '../types';

interface CallStatusChipProps {
  status: Contact['status'];
  callbackAt?: Contact['callback_at'];
}

const CallStatusChip: React.FC<CallStatusChipProps> = ({ status, callbackAt }) => {
  const getStatusLabel = (status: Contact['status']) => {
    switch (status) {
      case 'new': return 'Новий';
      case 'called': return 'Дзвонили';
      case 'failed': return 'Невдало';
      case 'callback': return `Передзвонити ${callbackAt ? `(${new Date(callbackAt).toLocaleString('uk-UA')})` : ''}`;
      default: return status;
    }
  };

  const getStatusColor = (status: Contact['status']) => {
    switch (status) {
      case 'new': return 'primary';
      case 'called': return 'success';
      case 'failed': return 'error';
      case 'callback': return 'warning';
      default: return 'default';
    }
  };

  return (
      <Chip
        label={getStatusLabel(status)}
        color={getStatusColor(status) as any}
        size="small"
      />
  );
};

export default CallStatusChip;