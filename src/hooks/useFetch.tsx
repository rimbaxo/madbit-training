import {useState} from 'react';

type LoginResponse = {
  access_token: string;
  token_type: string;
  expires_in: number;
};

type UseFetchState = {
  loading: boolean;
  error: string | null;
  data: any;
};

type FetchMethod = 'POST' | 'GET' | 'PUT' | 'DELETE';

const useFetch = (endpoint: string, method: FetchMethod, body?: any) => {
  const [state, setState] = useState<UseFetchState>({
    loading: false,
    error: null,
    data: undefined,
  });

  const fetchData = async () => {
    setState({...state, loading: true, error: null});

    const requestOptions: RequestInit = {
      method,
      body: body ? JSON.stringify(body) : undefined,
      redirect: 'follow',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    };

    try {
      // Questo indirizzo IP sta ad indicare per i simulatori l'indirizzo della macchina locale sempre anche nel caso in cui l'IP cambia
      const response = await fetch(endpoint, requestOptions);
      if (!response.ok) {
        throw new Error('Failed to login');
      }
      const data = await response.json();

      //dispatch(setAccessToken(data.access_token));

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
  };

  return {
    ...state,
    fetchData,
  };
};

export default useFetch;
