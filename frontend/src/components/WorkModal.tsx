import React, { useState } from 'react';
import { Dialog, DialogContent, Box, Tabs, Tab } from '@mui/material';
import CallLogTable from './CallLogTable';
import ActiveCall from './ActiveCall';
import {
  WORK_MODAL_TAB_ACTIVE_CALL,
  WORK_MODAL_TAB_CALL_LOG,
} from '../constants';

interface WorkModalProps {
  open: boolean;
  onClose: () => void;
}

const WorkModal: React.FC<WorkModalProps> = ({ open, onClose }) => {
  const [tab, setTab] = useState(WORK_MODAL_TAB_ACTIVE_CALL);

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
        {tab === WORK_MODAL_TAB_ACTIVE_CALL && (
          <Box>
            <ActiveCall />
          </Box>
        )}
        {tab === WORK_MODAL_TAB_CALL_LOG && (
          <Box>
            <CallLogTable />
          </Box>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default WorkModal;
