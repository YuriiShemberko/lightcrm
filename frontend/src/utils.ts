import { MIN_CALLBACK_HOURS } from './constants';
import type { CallLog, Contact } from './types';

import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

// Функція для отримання мінімальної дати для перезвону
export const getMinCallbackDate = (): Date => {
  const d = new Date();
  d.setHours(d.getHours() + MIN_CALLBACK_HOURS);
  return d;
};

// Функція для форматування дати у формат SQL DATETIME
export const toSqlDateTime = (date: Date): string => {
  return dayjs(date).utc().format('YYYY-MM-DD HH:mm:ss');
};

// Функція для перетворення SQL DATETIME у локальний формат
export const fromSqlDateTime = (sqlDateTime: string): string => {
  return dayjs.utc(sqlDateTime).local().format('DD.MM.YYYY HH:mm');
};

// Функція для конвертації результату дзвінка у статус контакту
export const callStatusToContactStatus = (
  callResult: CallLog['result']
): Contact['status'] => {
  switch (callResult) {
    case 'answered':
      return 'called';
    case 'no_answer':
      return 'failed';
    case 'busy':
      return 'callback';
    default:
      return 'new';
  }
};

// Функція для отримання текстового лейблу статусу контакту
export const getStatusLabel = (
  status: Contact['status'],
  callbackAt?: Contact['callback_at']
) => {
  switch (status) {
    case 'new':
      return 'Новий';
    case 'called':
      return 'Дзвонили';
    case 'failed':
      return 'Невдало';
    case 'callback':
      return `Передзвонити ${callbackAt ? `(${fromSqlDateTime(callbackAt)})` : ''}`;
    default:
      return status;
  }
};

// Функція для отримання кольору статусу контакту
export const getStatusColor = (status: Contact['status']) => {
  switch (status) {
    case 'new':
      return 'primary';
    case 'called':
      return 'success';
    case 'failed':
      return 'error';
    case 'callback':
      return 'warning';
    default:
      return 'default';
  }
};

// Функція для отримання кольору результату дзвінка
export const getResultColor = (result: CallLog['result']) => {
  switch (result) {
    case 'answered':
      return 'success';
    case 'no_answer':
      return 'warning';
    case 'busy':
      return 'error';
    default:
      return 'default';
  }
};

// Функція для отримання текстового лейблу результату дзвінка
export const getResultLabel = (result: CallLog['result']) => {
  switch (result) {
    case 'answered':
      return 'Відповів';
    case 'no_answer':
      return 'Не відповів';
    case 'busy':
      return 'Зайнято';
    default:
      return result;
  }
};

// Функція для форматування тривалості дзвінка у хвилини та секунди
export const formatDuration = (seconds: number) => {
  if (seconds === 0) return '—';
  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${minutes}м ${secs}с`;
};

// Валідація імені контакту
export const validateName = (value: string) => {
  if (!value.trim()) return 'Введіть імʼя';
  if (value.trim().length < 3) return 'Імʼя має містити мінімум 3 символи';
  if (!/^[а-яіїєґa-z\-\s']+$/i.test(value)) return 'Некоректне імʼя';
  return null;
};

// Валідація номера телефону
export const validatePhone = (value: string) => {
  if (!value.trim()) return 'Введіть номер телефону';
  if (!/^\+?[\d\s\-\(\)]{10,15}$/.test(value))
    return 'Некоректний номер (10-15 цифр)';
  return null;
};
