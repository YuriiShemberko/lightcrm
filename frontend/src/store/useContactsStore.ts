import { create } from 'zustand';
import { type Contact, type NewContactData } from '../types';
import { getContacts, createContact } from '../api/contacts';

type ContactStatus = Contact['status'] | null;

interface ContactsState {
  contacts: Contact[];
  isLoading: boolean;
  error: string | null;
  page: number;
  perPage: number;
  filterStatus: ContactStatus;
  addNewContact: (contact: NewContactData) => Promise<void>;
  changeFilterStatus: (status: ContactStatus) => void;
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
  addNewContact: async (contact: NewContactData) => {
    set({ isLoading: true, error: null });
    try {
      await createContact(contact);
      await get().reload();
    } catch (err: any) {
      let message = 'Помилка при створенні контакту';
      if (err?.response?.data?.error) {
        message = err.response.data.error;
      } else if (err?.message) {
        message = err.message;
      }
      set({ error: message, isLoading: false });
    }
  },
  reload: async () => {
    const { page, perPage, filterStatus } = get();

    set({ isLoading: true, error: null });

    const { data, success, error } = await getContacts(page, perPage, filterStatus);
    if (success && data) {
      set({
        contacts: data.items,
        total: data.meta.total,
        page: data.meta.page,
        isLoading: false,
      });
    } else {
      set({ error: error || 'Помилка при завантаженні контактів', isLoading: false });
    }
  }
}));