import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login as loginApi } from '../api/auth';
import { useAuthStore } from '../store/useAuthStore';

export const useLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const response = await loginApi(username, password);
      console.log(response);
      if (response.success) {
        login(response.data);
        navigate('/dashboard');
      } else {
        setError(response.error || 'Невірні дані');
      }
    } catch (err) {
      if (err.status === 401) {
        console.log(err);
        setError('Невірні дані');
      } else {
        setError('Сервер не відповідає');
      }
    } finally {
      setLoading(false);
    }
  };

  return {
    username,
    setUsername,
    password,
    setPassword,
    error,
    loading,
    handleSubmit,
  };
};