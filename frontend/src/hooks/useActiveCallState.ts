import { useState, useMemo, useCallback } from 'react';
import { useCallStore } from '../store/useCallStore';
import { getMinCallbackDate } from '../utils';

export const useActiveCallState = () => {
  const {
    activeContact: contact,
    isLoading,
    error,
    fetchNextContact,
    endCall,
    isTriggered,
  } = useCallStore();

  const [callbackOpen, setCallbackOpen] = useState(false);
  const [callbackAt, setCallbackAt] = useState<Date | null>(null);

  const [durationOpen, setDurationOpen] = useState(false);
  const [duration, setDuration] = useState('');

  const durationValue = Number(duration);
  const isDurationValid = Number.isInteger(durationValue) && durationValue > 0;

  // Мінімальна дата для перезвону: зараз + 2 хвилини
  const minDate = useMemo(getMinCallbackDate, []);

  // Валідація: callbackAt має бути не раніше minDate
  const isCallbackAtValid = callbackAt && callbackAt >= minDate;

  // Handlers
  const handleAnswered = useCallback(() => {
    setDurationOpen(true);
  }, []);

  const handleDurationSave = useCallback(() => {
    endCall('answered', durationValue);
    setDurationOpen(false);
    setDuration('');
  }, [durationValue, endCall]);

  const handleDurationCancel = useCallback(() => {
    setDurationOpen(false);
    setDuration('');
  }, []);

  const handleFailed = useCallback(() => {
    endCall('no_answer');
  }, [endCall]);

  const handleCallback = useCallback(() => {
    setCallbackOpen(true);
  }, []);

  const handleCallbackSave = useCallback(() => {
    endCall('busy', 0, callbackAt || undefined);
    setCallbackOpen(false);
    setCallbackAt(null);
  }, [endCall, callbackAt]);

  const handleCallbackCancel = useCallback(() => {
    setCallbackOpen(false);
  }, []);

  return {
    contact,
    isLoading,
    error,
    fetchNextContact,
    endCall,
    isTriggered,
    callbackOpen,
    setCallbackOpen,
    callbackAt,
    setCallbackAt,
    durationOpen,
    setDurationOpen,
    duration,
    setDuration,
    durationValue,
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
  };
};
