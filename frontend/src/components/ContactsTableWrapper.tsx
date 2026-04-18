import { Box, CircularProgress, Alert } from '@mui/material';
import ContactsEmptyState from './ContactsEmptyState';
import ScrollableTable, { type Column } from './ScrollableTable';
import { type Contact } from '../types';

interface Props {
  contacts: Contact[];
  isLoading: boolean;
  error: string | null;
  reload: () => void;
  columns: Column<Contact>[];
  total: number;
  page: number;
  perPage: number;
  changePage: (page: number) => void;
}

const ContactsTableWrapper = ({
  contacts,
  isLoading,
  error,
  reload,
  columns,
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
