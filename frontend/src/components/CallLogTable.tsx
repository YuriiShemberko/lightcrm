import { useEffect } from 'react';
import { Chip, Typography } from '@mui/material';
import { useCallLogsStore } from '../store/useCallLogsStore';
import ScrollableTable, { type Column } from './ScrollableTable';
import { type CallLog } from '../types';
import { getResultColor, getResultLabel, formatDuration } from '../utils';

const columns: Column<CallLog>[] = [
  {
    key: 'contact_name',
    label: 'Контакт',
    render: (log) => (
      <Typography variant="body2">{log.contact_name || 'Невідомий'}</Typography>
    ),
  },
  {
    key: 'called_at',
    label: 'Дата та час',
    render: (log) => (
      <Typography variant="body2">
        {new Date(log.called_at).toLocaleString('uk-UA')}
      </Typography>
    ),
  },
  {
    key: 'result',
    label: 'Результат',
    render: (log) => (
      <Chip
        label={getResultLabel(log.result)}
        color={getResultColor(log.result) as any}
        size="small"
      />
    ),
  },
  {
    key: 'duration_sec',
    label: 'Тривалість',
    align: 'right',
    render: (log) => (
      <Typography variant="body2" color="text.secondary">
        {formatDuration(log.duration_sec)}
      </Typography>
    ),
  },
];

const CallLogTable = () => {
  const { callLogs, isLoading, total, page, perPage, reload, changePage } =
    useCallLogsStore();

  useEffect(() => {
    reload();
  }, []);

  if (isLoading) {
    return (
      <Typography color="text.secondary" align="center" sx={{ py: 3 }}>
        Завантаження...
      </Typography>
    );
  }

  return (
    <ScrollableTable
      columns={columns}
      rows={callLogs}
      total={total}
      page={page}
      perPage={perPage}
      onPageChange={changePage}
      title="Історія звінків"
      emptyText="Немає записів про звінки"
    />
  );
};

export default CallLogTable;
