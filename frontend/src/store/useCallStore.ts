import { create } from 'zustand';
import { type Contact } from '../types';
import { getNextContact } from '../api/contacts';
import { type CallLog } from '../types';
import { createCallLog } from '../api/callLogs';
import { updateContactStatus } from '../api/contacts';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

interface CallStoreState {
	activeContact: Contact | null;
	isLoading: boolean;
  isTriggered: boolean;
	error: string | null;
	fetchNextContact: () => Promise<void>;
	endCall: (status: CallLog['result'], durationSec?: number, callbackAt?: Date) => void;
	reset: () => void;
}

export const useCallStore = create<CallStoreState>((set, get) => ({
	activeContact: null,
	isLoading: false,
  startTime: null,
  isTriggered: false,
	error: null,
	fetchNextContact: async () => {
		set({ isLoading: true, isTriggered: true, error: null });
    try {
      const { data, success, error } = await getNextContact();
      if (success) {
        if (data) set({ activeContact: data, isLoading: false });
        else set({ activeContact: null, isLoading: false });
      } else {
        set({ error: error || 'Помилка при отриманні наступного контакту', isLoading: false });
      }
    } catch (err) {
      set({ error: 'Помилка при отриманні наступного контакту', isLoading: false });
    }
	},
	endCall: async (status: CallLog['result'], durationSec: number = 0, callbackAt?: Date) => {
    set({ isLoading: true, error: null });

    try {
      const { activeContact } = get();
      if (!activeContact) {
        console.warn('No active contact to finish call for');
        return;
      }

      await createCallLog(activeContact.id, {
        result: status,
        duration_sec: durationSec,
      });

      const contactStatus = status === 'no_answer' ? 'failed' : status === 'busy' ? 'callback' : 'called';
  
      const callbackAtSqlFormat = callbackAt ? dayjs(callbackAt).utc().format('YYYY-MM-DD HH:mm:ss') : undefined;

      await updateContactStatus(activeContact.id, contactStatus, callbackAtSqlFormat);

    } catch (err) {
        set({ error: 'Помилка при завершенні дзвінка', isLoading: false });
        return;
    }

    set({ isLoading: false, activeContact: null, isTriggered: false });
	},
	reset: () => {
		set({ activeContact: null, isLoading: false, error: null, isTriggered: false });
	},
}));
