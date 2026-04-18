import api from './client';
import { type ApiResponse, type User } from '../types';

export const login = async (
  login: string,
  password: string
): Promise<ApiResponse<User>> => {
  const { data } = await api.post('/auth/login', { login, password });
  return data;
};

export const logout = async (): Promise<ApiResponse<void>> => {
  const { data } = await api.post('/auth/logout');
  return data;
};
