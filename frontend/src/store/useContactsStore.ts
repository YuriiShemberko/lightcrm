import { create } from 'zustand';
import { type Contact } from '../types';
import { getContacts } from '../api/contacts';

interface ContactsState {
  contacts: Contact[];
  isLoading: boolean;
  error: string | null;
  page: number;
  perPage: number;
  filterStatus: Contact['status'] | null;
  changeFilterStatus: (status: Contact['status'] | null) => void;
  total: number;
  changePage: (page: number) => void;
  reload: () => void;
}

const PER_PAGE = 10;

export const useContactsStore = create<ContactsState>((set, get) => ({
  contacts: [],
  isLoading: false,
  total: -1,
  filterStatus: null,
  error: null,
  page: 1,
  perPage: PER_PAGE,
  changeFilterStatus: (status) => {
    set({ filterStatus: status }),
    get().reload();
  },
  changePage: (page: number) => {
    set({ page });
    get().reload();
  },
  reload: async () => {
    const { page, perPage, filterStatus } = get();

    set({ isLoading: true, error: null });

    const { data, success, error } = await getContacts(page, perPage, filterStatus);
    if (success && data) {
      set({
        contacts: data.items,
        total: data.meta.total,
        isLoading: false,
      });
    } else {
      set({ error: error || 'Помилка при завантаженні контактів', isLoading: false });
    }
  }
}));