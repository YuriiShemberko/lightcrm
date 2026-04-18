import { Box, CircularProgress, Alert, Typography } from '@mui/material';
import ContactsEmptyState from './ContactsEmptyState';
import ScrollableTable, { type Column } from './ScrollableTable';
import { type Contact } from '../types';
import CallStatusChip from './CallStatusChip';
import { fromSqlDateTime } from '../utils';

interface Props {
  contacts: Contact[];
  isLoading: boolean;
  error: string | null;
  reload: () => void;
  total: number;
  page: number;
  perPage: number;
  changePage: (page: number) => void;
}

const columns: Column<Contact>[] = [
  {
    key: 'name',
    label: "Ім'я",
    render: (contact) => (
      <Typography variant="body1" sx={{ fontWeight: 'medium' }}>
        {contact.name}
      </Typography>
    ),
  },
  {
    key: 'phone',
    label: 'Телефон',
    render: (contact) => (
      <Typography variant="body2">{contact.phone}</Typography>
    ),
  },
  {
    key: 'status',
    label: 'Статус',
    render: (contact) => (
      <CallStatusChip
        status={contact.status}
        callbackAt={contact.callback_at}
      />
    ),
  },
  {
    key: 'created_at',
    label: 'Створено',
    render: (contact) => (
      <Typography variant="body2" color="text.secondary">
        {fromSqlDateTime(contact.created_at)}
      </Typography>
    ),
  },
];

const ContactsTableWrapper = ({
  contacts,
  isLoading,
  error,
  reload,
  total,
  page,
  perPage,
  changePage,
}: Props) => {
  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
        <CircularProgress />
      </Box>
    );
  }
  if (error) {
    return (
      <Alert
        severity="error"
        action={
          <button
            onClick={reload}
            style={{
              background: 'none',
              border: 'none',
              color: '#1976d2',
              cursor: 'pointer',
            }}
          >
            Спробувати знову
          </button>
        }
      >
        {error}
      </Alert>
    );
  }
  if (contacts.length === 0) {
    return <ContactsEmptyState />;
  }
  return (
    <ScrollableTable
      columns={columns}
      rows={contacts}
      total={total}
      page={page}
      perPage={perPage}
      onPageChange={changePage}
      title={undefined}
    />
  );
};

export default ContactsTableWrapper;
