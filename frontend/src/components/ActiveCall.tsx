import { useActiveCallState } from '../hooks/useActiveCallState';
import { Paper, Button } from '@mui/material';
import { CallInfo } from './CallInfo';
import { CallActions } from './CallActions';
import { CallDurationDialog } from './CallDurationDialog';
import { CallbackDialog } from './CallbackDialog';
import { CallError } from './CallError';
import { CallLoader } from './CallLoader';
import { CallEmptyState } from './CallEmptyState';
import { MIN_CALLBACK_HOURS } from '../constants';

const ActiveCall = () => {
  const {
    contact,
    isLoading,
    error,
    fetchNextContact,
    isTriggered,
    callbackOpen,
    callbackAt,
    setCallbackAt,
    durationOpen,
    duration,
    setDuration,
    isDurationValid,
    minDate,
    isCallbackAtValid,
    handleAnswered,
    handleDurationSave,
    handleDurationCancel,
    handleFailed,
    handleCallback,
    handleCallbackSave,
    handleCallbackCancel,
  } = useActiveCallState();

  return (
    <>
      {isLoading && <CallLoader />}
      {error && <CallError error={error} />}
      {contact && (
        <Paper sx={{ p: 2, mb: 2, backgroundColor: '#f5f5f5' }}>
          <CallInfo contact={contact} />
          <CallActions
            onAnswered={handleAnswered}
            onFailed={handleFailed}
            onCallback={handleCallback}
          />
          <CallDurationDialog
            open={durationOpen}
            duration={duration}
            isValid={isDurationValid}
            onChange={setDuration}
            onSave={handleDurationSave}
            onCancel={handleDurationCancel}
          />
          <CallbackDialog
            open={callbackOpen}
            callbackAt={callbackAt}
            minDate={minDate}
            isValid={!!isCallbackAtValid}
            minCallbackHours={MIN_CALLBACK_HOURS}
            onChange={setCallbackAt}
            onSave={handleCallbackSave}
            onCancel={handleCallbackCancel}
          />
        </Paper>
      )}
      {!contact && isTriggered && <CallEmptyState />}
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
