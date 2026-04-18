import { Stack, Button } from '@mui/material';

interface CallActionsProps {
  onAnswered: () => void;
  onFailed: () => void;
  onCallback: () => void;
}

export const CallActions = ({
  onAnswered,
  onFailed,
  onCallback,
}: CallActionsProps) => (
  <Stack spacing={2} direction={{ xs: 'column', sm: 'row' }}>
    <Button variant="contained" color="success" fullWidth onClick={onAnswered}>
      Відповів
    </Button>
    <Button variant="contained" color="error" fullWidth onClick={onFailed}>
      Не відповів
    </Button>
    <Button variant="contained" color="warning" fullWidth onClick={onCallback}>
      Передзвонити
    </Button>
  </Stack>
);
