import { useState } from 'react';

type LoginResponse = {
  access_token: string;
  token_type: string;
  expires_in: number;
}

type UseLoginState = {
  loading: boolean;
  error: string | null;
  accessToken: string | null;
  expiresIn: number | null;
}

const useLogin = () => {

  const [state, setState] = useState<UseLoginState>({
    loading: false,
    error: null,
    accessToken: null,
    expiresIn: null,
  });

  const login = async (email: string, password: string) => {

    setState({ ...state, loading: true, error: null });

    const body = {
        email, password
    }

    const requestOptions: RequestInit = {
      method: 'POST',
      body: JSON.stringify(body),
      redirect: 'follow',
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      }
    };

    try {
      const response = await fetch("http://192.168.1.191:8080/auth/login", requestOptions)
      console.log("RESPONSE", response)
      if (!response.ok) {
        console.log("response", await response.json())
        throw new Error('Failed to login');
      }
      const data: LoginResponse = await response.json();

      setState({
        loading: false,
        error: null,
        accessToken: data.access_token,
        expiresIn: data.expires_in,
      });
    } catch (err: any) {
        console.log("ERR", err)

      setState({
        ...state,
        loading: false,
        error: err.message || 'Login failed',
        accessToken: null,
        expiresIn: null,
      });
    }
  };

  return {
    ...state,
    login,
  };
};

export default useLogin;
