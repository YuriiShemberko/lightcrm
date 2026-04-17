import {
  Box,
  Button,
  Typography,
} from '@mui/material';
import CallStatusChip from './CallStatusChip';
import { useContactsStore } from '../store/useContactsStore';
import ContactStatusSwitcher from './ContactStatusSwitcher';
import NewContactModal from './NewContactModal';
import { useState } from 'react';
import { type NewContactData, type Contact } from '../types';
import { type Column } from './ScrollableTable';
import ContactsTableWrapper from './ContactsTableWrapper';
import { usePolling } from '../hooks/usePolling';

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

  usePolling(reload, 30000);
  
  const [isModalOpen, setIsModalOpen] = useState(false);

  const columns: Column<Contact>[] = [
    {
      key: 'name',
      label: "Ім'я",
      render: (contact) => <Typography variant="body1" sx={{ fontWeight: 'medium' }}>{contact.name}</Typography>,
    },
    {
      key: 'phone',
      label: 'Телефон',
      render: (contact) => <Typography variant="body2">{contact.phone}</Typography>,
    },
    {
      key: 'status',
      label: 'Статус',
      render: (contact) => <CallStatusChip status={contact.status} callbackAt={contact.callback_at} />,
    },
    {
      key: 'created_at',
      label: 'Створено',
      render: (contact) => <Typography variant="body2" color="text.secondary">{new Date(contact.created_at).toLocaleDateString('uk-UA')}</Typography>,
    },
  ];

  return (
    <>
      <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#f9f9f9', borderBottom: '1px solid #eee' }}>
        <Typography color="primary" variant="h6" align="left">
          Контакти {total > 0 ? `(${total})` : ''}
          <Typography variant="body2" color="textSecondary">
            Оновлюється кожні 30 секунд
          </Typography>
        </Typography>
        <Button onClick={() => setIsModalOpen(true)}>
          Додати контакт
        </Button>
        <ContactStatusSwitcher value={filterStatus} onChange={changeFilterStatus} />
      </Box>
      <ContactsTableWrapper
        contacts={contacts}
        isLoading={isLoading}
        error={error}
        reload={reload}
        columns={columns}
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