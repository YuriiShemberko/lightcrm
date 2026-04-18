import { Box, Button, Typography } from '@mui/material';
import { useContactsStore } from '../store/useContactsStore';
import ContactStatusSwitcher from './ContactStatusSwitcher';
import NewContactModal from './NewContactModal';
import { useState } from 'react';
import { type NewContactData } from '../types';
import ContactsTableWrapper from './ContactsTableWrapper';
import { usePolling } from '../hooks/usePolling';
import { CONTACTS_REFRESH_INTERVAL } from '../constants';

const ContactsScreen = () => {
  const {
    contacts,
    isLoading,
    error,
    page,
    total,
    changePage,
    filterStatus,
    changeFilterStatus,
    addNewContact,
    perPage,
    reload,
  } = useContactsStore();

  usePolling(reload, CONTACTS_REFRESH_INTERVAL);

  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Box
        sx={{
          p: 2,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: '#f9f9f9',
          borderBottom: '1px solid #eee',
        }}
      >
        <Typography color="primary" variant="h6" align="left">
          Контакти {total > 0 ? `(${total})` : ''}
          <Typography variant="body2" color="textSecondary">
            Оновлюється кожні {CONTACTS_REFRESH_INTERVAL / 1000} секунд
          </Typography>
        </Typography>
        <Button onClick={() => setIsModalOpen(true)}>Додати контакт</Button>
        <ContactStatusSwitcher
          value={filterStatus}
          onChange={changeFilterStatus}
        />
      </Box>
      <ContactsTableWrapper
        contacts={contacts}
        isLoading={isLoading}
        error={error}
        reload={reload}
        total={total}
        page={page}
        perPage={perPage}
        changePage={changePage}
      />
      <NewContactModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={(data: NewContactData) => {
          addNewContact(data);
          setIsModalOpen(false);
        }}
      />
    </>
  );
};

export default ContactsScreen;
