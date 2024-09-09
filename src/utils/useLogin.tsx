import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setAccessToken, setIsLoggedIn } from '../redux/authSlice';

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

    const dispatch = useDispatch();

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
    // Questo indirizzo IP sta ad indicare per i simulatori l'indirizzo della macchina locale sempre anche nel caso in cui l'IP cambi
      const response = await fetch("http://10.0.2.2:8080/auth/login", requestOptions)
      console.log("RESPONSE", response)
      if (!response.ok) {
        console.log("response", await response.json())
        throw new Error('Failed to login');
      }
      const data: LoginResponse = await response.json();
      
      dispatch(setAccessToken(data.access_token));


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

  const logout = () => {
    dispatch(setAccessToken(null));
    dispatch(setIsLoggedIn(false));
  };

  return {
    ...state,
    login,
    logout
  };
};

export default useLogin;
