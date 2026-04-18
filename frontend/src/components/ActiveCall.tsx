import {
  Paper,
  Typography,
  Box,
  Button,
  CircularProgress,
  Alert,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { useState, useMemo } from 'react';
import TextField from '@mui/material/TextField';
import { useCallStore } from '../store/useCallStore';

const ActiveCall = () => {
  const {
    activeContact: contact,
    isLoading,
    error,
    fetchNextContact,
    endCall,
    isTriggered,
  } = useCallStore();
  // State for callback dialog
  const [callbackOpen, setCallbackOpen] = useState(false);
  const [callbackAt, setCallbackAt] = useState<Date | null>(null);
  // State for call duration dialog
  const [durationOpen, setDurationOpen] = useState(false);
  const [duration, setDuration] = useState('');
  const durationValue = Number(duration);
  const isDurationValid = Number.isInteger(durationValue) && durationValue > 0;

  // Мінімальна дата для перезвону: зараз + 2 години
  const minDate = useMemo(() => {
    const d = new Date();
    d.setHours(d.getHours() + 2);
    d.setMinutes(d.getMinutes(), 0, 0); // округлити до хвилини
    return d;
  }, []);

  // Валідація: callbackAt має бути не раніше minDate
  const isCallbackAtValid = callbackAt && callbackAt >= minDate;

  // Handlers
  const handleAnswered = () => {
    setDurationOpen(true);
  };
  const handleDurationSave = () => {
    endCall('answered', durationValue);
    setDurationOpen(false);
    setDuration('');
  };
  const handleDurationCancel = () => {
    setDurationOpen(false);
    setDuration('');
  };
  const handleFailed = () => {
    endCall('no_answer');
  };
  const handleCallback = () => {
    setCallbackOpen(true);
  };
  const handleCallbackSave = () => {
    // TODO: set status to 'callback', set callback_at, create log
    endCall('busy', 0, callbackAt || undefined);
    setCallbackOpen(false);
    setCallbackAt(null);
  };
  const handleCallbackCancel = () => {
    setCallbackOpen(false);
  };

  return (
    <>
      {isLoading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Alert severity="error">{error}</Alert>
      ) : contact ? (
        <Paper sx={{ p: 2, mb: 2, backgroundColor: '#f5f5f5' }}>
          <Typography variant="body1" sx={{ mb: 1 }}>
            <strong>Ім'я:</strong> {contact.name}
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            <strong>Телефон:</strong> {contact.phone}
          </Typography>
          <Stack spacing={2} direction={{ xs: 'column', sm: 'row' }}>
            <Button
              variant="contained"
              color="success"
              fullWidth
              onClick={handleAnswered}
            >
              Відповів
            </Button>
            <Button
              variant="contained"
              color="error"
              fullWidth
              onClick={handleFailed}
            >
              Не відповів
            </Button>
            <Button
              variant="contained"
              color="warning"
              fullWidth
              onClick={handleCallback}
            >
              Передзвонити
            </Button>
          </Stack>
          {/* Dialog for call duration input */}
          <Dialog open={durationOpen} onClose={handleDurationCancel}>
            <DialogTitle>
              <Typography color="primary">
                Введіть тривалість дзвінка (секунди)
              </Typography>
            </DialogTitle>
            <DialogContent>
              <TextField
                autoFocus
                margin="dense"
                label="Тривалість (секунди)"
                type="number"
                value={duration}
                onChange={(e) => setDuration(e.target.value.replace(/\D/, ''))}
                fullWidth
                error={!!duration && !isDurationValid}
                helperText={
                  !!duration && !isDurationValid
                    ? 'Введіть додатне ціле число'
                    : ''
                }
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleDurationCancel}>Скасувати</Button>
              <Button
                onClick={handleDurationSave}
                variant="contained"
                disabled={!isDurationValid}
              >
                Зберегти
              </Button>
            </DialogActions>
          </Dialog>
          {/* Dialog for callback date/time */}
          <Dialog open={callbackOpen} onClose={handleCallbackCancel}>
            <DialogTitle>
              <Typography color="primary">
                Виберіть дату і час для передзвону
              </Typography>
            </DialogTitle>
            <DialogContent>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DateTimePicker
                  value={callbackAt}
                  onChange={setCallbackAt}
                  minDateTime={minDate}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      helperText: !isCallbackAtValid
                        ? 'Дата має бути не раніше ніж через 2 години'
                        : undefined,
                    },
                  }}
                  ampm={false}
                />
              </LocalizationProvider>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCallbackCancel}>Скасувати</Button>
              <Button
                onClick={handleCallbackSave}
                variant="contained"
                disabled={!isCallbackAtValid}
              >
                Зберегти
              </Button>
            </DialogActions>
          </Dialog>
        </Paper>
      ) : isTriggered ? (
        <Alert sx={{ mb: 2 }} severity="info">
          Відсутні контакти для дзвінка у черзі
        </Alert>
      ) : null}
      {!contact && (
        <Button
          variant="contained"
          color="primary"
          onClick={fetchNextContact}
          disabled={isLoading}
          fullWidth
        >
          Наступний дзвінок
        </Button>
      )}
    </>
  );
};

export default ActiveCall;
