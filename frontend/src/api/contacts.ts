import api from './client';
import { type ApiResponse, type Contact, type PaginatedData } from '../types';

export const getContacts = async (page: number, perPage: number, filterStatus: Contact['status'] | null = null): Promise<ApiResponse<PaginatedData<Contact>>> => {
  const { data } = await api.get('/contacts', {
    params: { page, per_page: perPage, status: filterStatus }
  });
  return data;
};

export const getContact = async (id: number): Promise<ApiResponse<Contact>> => {
  const { data } = await api.get(`/contacts/${id}`);
  return data;
};

export const createContact = async (contact: Omit<Contact, 'id' | 'created_at' | 'updated_at'>): Promise<ApiResponse<Contact>> => {
  const { data } = await api.post('/contacts', contact);
  return data;
};

export const updateContact = async (id: number, contact: Partial<Omit<Contact, 'id' | 'created_at' | 'updated_at'>>): Promise<ApiResponse<Contact>> => {
  const { data } = await api.put(`/contacts/${id}`, contact);
  return data;
};

export const deleteContact = async (id: number): Promise<ApiResponse<void>> => {
  const { data } = await api.delete(`/contacts/${id}`);
  return data;
};