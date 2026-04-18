import React, { useState } from 'react';
import { Dialog, DialogContent, Box, Tabs, Tab } from '@mui/material';
import CallLogTable from './CallLogTable';
import ActiveCall from './ActiveCall';

interface WorkModalProps {
  open: boolean;
  onClose: () => void;
}

const WorkModal: React.FC<WorkModalProps> = ({ open, onClose }) => {
  const [tab, setTab] = useState(0);

  // Передаємо tab і reload у CallLogTable для рефетчу при відкритті таби

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogContent sx={{ pt: 2 }}>
        <Tabs
          value={tab}
          onChange={(_, v) => setTab(v)}
          centered
          sx={{ mb: 2 }}
        >
          <Tab label="Дзвінок" />
          <Tab label="Історія" />
        </Tabs>
        {tab === 0 && (
          <Box>
            <ActiveCall />
          </Box>
        )}
        {tab === 1 && (
          <Box>
            <CallLogTable />
          </Box>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default WorkModal;
