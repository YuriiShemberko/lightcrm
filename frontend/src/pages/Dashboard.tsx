import React, { useState } from 'react';
import { Container, Typography, Button, Stack, Paper } from '@mui/material';
import { useAuthStore } from '../store/useAuthStore';
import ContactsList from '../components/ContactsList';
import WorkModal from '../components/WorkModal';

const Dashboard: React.FC = () => {
  const { user, logout } = useAuthStore();
  const [showWorkModal, setShowWorkModal] = useState(false);

  return (
    <Container sx={{ mt: 4 }}>
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h4" gutterBottom>
          Вітаємо в системі, {user?.login}!
        </Typography>

        <Stack direction="row" spacing={2} sx={{ justifyContent: 'center' }}>
          <Button
            variant="contained"
            color="success"
            onClick={() => setShowWorkModal(true)}
          >
            Почати роботу
          </Button>
          <Button variant="outlined" color="error" onClick={logout}>
            Вийти
          </Button>
        </Stack>
      </Paper>
      <ContactsList />
      <WorkModal open={showWorkModal} onClose={() => setShowWorkModal(false)} />
    </Container>
  );
};

export default Dashboard;
