import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  TextField,
} from '@mui/material';

interface CallDurationDialogProps {
  open: boolean;
  duration: string;
  isValid: boolean;
  onChange: (val: string) => void;
  onSave: () => void;
  onCancel: () => void;
}

export const CallDurationDialog = ({
  open,
  duration,
  isValid,
  onChange,
  onSave,
  onCancel,
}: CallDurationDialogProps) => (
  <Dialog open={open} onClose={onCancel}>
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
        onChange={(e) => onChange(e.target.value.replace(/\D/, ''))} // дозволяємо вводити тільки цифри
        fullWidth
        error={!!duration && !isValid}
        helperText={!!duration && !isValid ? 'Введіть додатне ціле число' : ''}
      />
    </DialogContent>
    <DialogActions>
      <Button onClick={onCancel}>Скасувати</Button>
      <Button onClick={onSave} variant="contained" disabled={!isValid}>
        Зберегти
      </Button>
    </DialogActions>
  </Dialog>
);
