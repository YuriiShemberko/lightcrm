import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

interface CallbackDialogProps {
  open: boolean;
  callbackAt: Date | null;
  minDate: Date;
  minCallbackHours: number;
  isValid: boolean;
  onChange: (date: Date | null) => void;
  onSave: () => void;
  onCancel: () => void;
}

export const CallbackDialog = ({
  open,
  callbackAt,
  minDate,
  isValid,
  onChange,
  onSave,
  onCancel,
  minCallbackHours,
}: CallbackDialogProps) => (
  <Dialog open={open} onClose={onCancel}>
    <DialogTitle>
      <Typography color="primary">
        Виберіть дату і час для передзвону
      </Typography>
    </DialogTitle>
    <DialogContent>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DateTimePicker
          value={callbackAt}
          onChange={onChange}
          minDateTime={minDate}
          slotProps={{
            textField: {
              fullWidth: true,
              helperText: !isValid
                ? `Дата має бути не раніше ніж через ${minCallbackHours} годин`
                : undefined,
            },
          }}
          ampm={false}
        />
      </LocalizationProvider>
    </DialogContent>
    <DialogActions>
      <Button onClick={onCancel}>Скасувати</Button>
      <Button onClick={onSave} variant="contained" disabled={!isValid}>
        Зберегти
      </Button>
    </DialogActions>
  </Dialog>
);
