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
    per_page: number;
  };
}

export interface Contact {
  id: number;
  name: string;
  phone: string;
  status: 'new' | 'called' | 'failed' | 'callback';
  callback_at?: string | null;
  created_at: string;
}

export interface CallLog {
  id: number;
  contact_id: number;
  called_at: string;
  duration_sec: number;
  result: 'answered' | 'no_answer' | 'busy';
  contact_name?: string | null;
}

export type NewContactData = Pick<Contact, 'name' | 'phone'>;

export interface User {
  id: number;
  login: string;
}
