import { create } from 'zustand';
import { type CallLog } from '../types';
import { getCallLogs } from '../api/callLogs';
import { CALL_LOG_PER_PAGE } from '../constants';

interface CallLogsState {
  callLogs: CallLog[];
  isLoading: boolean;
  error: string | null;
  page: number;
  perPage: number;
  total: number;
  load: (page?: number) => Promise<void>;
  changePage: (page: number) => void;
  reload: () => Promise<void>;
}

export const useCallLogsStore = create<CallLogsState>((set, get) => ({
  callLogs: [],
  isLoading: false,
  error: null,
  page: 1,
  perPage: CALL_LOG_PER_PAGE,
  total: 0,

  load: async (page = 1) => {
    set({ isLoading: true, error: null, page });

    try {
      const { data, success, error } = await getCallLogs(
        page,
        CALL_LOG_PER_PAGE
      );
      if (success && data) {
        set({
          callLogs: data.items,
          total: data.meta.total,
          page: data.meta.page,
          isLoading: false,
        });
      } else {
        set({
          error: error || 'Помилка при завантаженні логів звінків',
          isLoading: false,
        });
      }
    } catch (err) {
      set({
        error: 'Помилка при завантаженні логів звінків',
        isLoading: false,
      });
    }
  },

  changePage: (page: number) => {
    set({ page });
    get().load(page);
  },

  reload: async () => {
    const { page } = get();
    await get().load(page);
  },
}));
