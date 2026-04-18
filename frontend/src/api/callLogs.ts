import api from './client';
import { type ApiResponse, type CallLog, type PaginatedData } from '../types';

export const getCallLogs = async (
  page: number = 1,
  perPage: number = 10
): Promise<ApiResponse<PaginatedData<CallLog>>> => {
  const { data } = await api.get(`/call-logs`, {
    params: { page, per_page: perPage },
  });
  return data;
};

export const getCallLog = async (
  contactId: number,
  logId: number
): Promise<ApiResponse<CallLog>> => {
  const { data } = await api.get(`/contacts/${contactId}/call-logs/${logId}`);
  return data;
};

export const createCallLog = async (
  contactId: number,
  callLog: Pick<CallLog, 'result' | 'duration_sec'>
): Promise<ApiResponse<CallLog>> => {
  const { data } = await api.post(`/call-logs`, {
    contact_id: contactId,
    ...callLog,
  });
  return data;
};

export const updateCallLog = async (
  contactId: number,
  logId: number,
  updates: Partial<Omit<CallLog, 'id' | 'contact_id' | 'called_at'>>
): Promise<ApiResponse<CallLog>> => {
  const { data } = await api.patch(
    `/contacts/${contactId}/call-logs/${logId}`,
    updates
  );
  return data;
};

export const deleteCallLog = async (
  contactId: number,
  logId: number
): Promise<ApiResponse<void>> => {
  const { data } = await api.delete(
    `/contacts/${contactId}/call-logs/${logId}`
  );
  return data;
};
