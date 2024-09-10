import {useCallback, useState} from 'react';
import {BASE_URL} from '../constants';
import {UseFetchState} from '../types';

type FetchMethod = 'POST' | 'GET' | 'PUT' | 'DELETE';

// Qui assegno di default il valore undefined al secondo tipo generico perchè nelle GET non ho il body
const useFetch = <T, R = undefined>(
  endpoint: string,
  method: FetchMethod,
  body?: R,
  token?: string | undefined,
) => {
  const [state, setState] = useState<UseFetchState<T>>({
    loading: false,
    error: null,
    data: undefined,
  });

  // TODO: FARE USESELECTORE DEL TOKEN QUI DENTRO

  const fetchData = useCallback(async () => {
    // Qui devo mettere prevState altrimenti se usassi lo state del componente andrebbe ancora in loop infinito
    setState(prevState => ({
      ...prevState,
      loading: true,
      error: null,
    }));

    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      ...(token && {Authorization: `Bearer ${token}`}), // Aggiungo il token se presente
    };

    const requestOptions: RequestInit = {
      method,
      body: body ? JSON.stringify(body) : undefined,
      redirect: 'follow',
      headers: headers,
    };

    try {
      const response = await fetch(BASE_URL + endpoint, requestOptions);
      if (!response.ok) {
        throw new Error('Failed to login');
      }
      const data: T = await response.json();

      setState({
        loading: false,
        error: null,
        data: data,
      });
    } catch (err: any) {
      console.log('ERR', err);
      setState({
        loading: false,
        error: err.message || 'Login failed',
        data: undefined,
      });
    }
  }, [endpoint, method, body, token]);

  return {
    ...state,
    fetchData,
  };
};

export default useFetch;
