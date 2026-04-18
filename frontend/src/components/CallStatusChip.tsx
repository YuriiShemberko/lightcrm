import React from 'react';
import { Chip } from '@mui/material';
import { type Contact } from '../types';
import { getStatusColor, getStatusLabel } from '../utils';

interface CallStatusChipProps {
  status: Contact['status'];
  callbackAt?: Contact['callback_at'];
}

const CallStatusChip: React.FC<CallStatusChipProps> = ({
  status,
  callbackAt,
}) => {
  return (
    <Chip
      label={getStatusLabel(status, callbackAt)}
      color={getStatusColor(status) as any}
      size="small"
    />
  );
};

export default CallStatusChip;
