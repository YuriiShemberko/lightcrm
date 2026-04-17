import React from 'react';
import { Container, Typography, Button, Box, Paper } from '@mui/material';
import { useAuthStore } from '../store/useAuthStore';
import ContactsList from '../components/ContactsList';

const Dashboard: React.FC = () => {
  const { user, logout } = useAuthStore();

  return (
    <Container sx={{ mt: 4 }}>
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h4" gutterBottom>
          Вітаємо в системі, {user?.login}!
        </Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
          Ось список ваших контактів:
        </Typography>

        <Box sx={{ mt: 2 }}>
          <Button variant="outlined" color="error" onClick={logout}>
            Вийти
          </Button>
        </Box>
      </Paper>
      <ContactsList/>
    </Container>
  );
};

export default Dashboard;