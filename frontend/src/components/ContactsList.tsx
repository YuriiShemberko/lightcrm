import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
  CircularProgress,
  Alert,
  Button,
  TablePagination,
} from '@mui/material';
import { Refresh as RefreshIcon } from '@mui/icons-material';
import ContactsEmptyState from './ContactsEmptyState';
import CallStatusChip from './CallStatusChip';
import { useContactsStore } from '../store/useContactsStore';
import ContactStatusSwitcher from './ContactStatusSwitcher';
import { useEffect } from 'react';

const ContactsList = () => {
  const {
    contacts,
    isLoading,
    error,
    page,
    total,
    changePage,
    filterStatus,
    changeFilterStatus,
    perPage,
    reload,
  } = useContactsStore();

  useEffect(() => {
    reload();
  }, []);

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
          <Button color="inherit" size="small" onClick={reload}>
            Спробувати знову
          </Button>
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
    <TableContainer component={Paper}>
      <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h6">
          Контакти {total > 0 ? `(${total})` : ''}
        </Typography>
        <Button
          startIcon={<RefreshIcon />}
          onClick={reload}
          variant="outlined"
          size="small"
        >
          Оновити
        </Button>
        <ContactStatusSwitcher value={filterStatus} onChange={changeFilterStatus} />
      </Box>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell><strong>Ім'я</strong></TableCell>
            <TableCell><strong>Телефон</strong></TableCell>
            <TableCell><strong>Статус</strong></TableCell>
            <TableCell><strong>Створено</strong></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {contacts.map((contact) => (
            <TableRow key={contact.id} hover>
              <TableCell>
                <Typography variant="body1" sx={{ fontWeight: 'medium' }}>
                  {contact.name}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="body2">
                  {contact.phone}
                </Typography>
              </TableCell>
              <TableCell>
                <CallStatusChip status={contact.status} callbackAt={contact.callback_at} />
              </TableCell>
              <TableCell>
                <Typography variant="body2" color="text.secondary">
                  {new Date(contact.created_at).toLocaleDateString('uk-UA')}
                </Typography>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <TablePagination
        component="div"
        count={total}
        rowsPerPage={perPage}
        rowsPerPageOptions={[]}
        labelRowsPerPage=""
        page={page - 1}
        onPageChange={(_, page) => changePage(page + 1)}
      />
    </TableContainer>
  );
};

export default ContactsList;