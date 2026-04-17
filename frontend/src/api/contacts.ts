import api from './client';
import { type ApiResponse, type Contact, type PaginatedData, type NewContactData } from '../types';

export const getContacts = async (page: number, perPage: number, filterStatus: Contact['status'] | null = null): Promise<ApiResponse<PaginatedData<Contact>>> => {
  const { data } = await api.get('/contacts', {
    params: { page, per_page: perPage, status: filterStatus }
  });
  return data;
};

export const createContact = async (contact: NewContactData): Promise<ApiResponse<Contact>> => {
  const { data } = await api.post('/contacts', contact);
  return data;
};

export const getNextContact = async (): Promise<ApiResponse<Contact>> => {
  const { data } = await api.get('/contacts/next');
  return data;
};

export const updateContactStatus = async (id: number, status: Contact['status'], callbackAtSqlFormat?: string): Promise<ApiResponse<Contact>> => {
  const { data } = await api.patch(`/contacts/${id}/status`, { status, callback_at: callbackAtSqlFormat });
  return data;
};