export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

export interface PaginatedData<T> {
  items: T[];
  meta: {
    page: number;
    total: number;
    perPage: number;
  }
}

export interface User {
  id: number;
  login: string;
}

export interface Contact {
  id: number;
  name: string;
  phone: string;
  status: 'new' | 'called' | 'failed' | 'callback';
  callback_at?: string | null;
  created_at: string;
}