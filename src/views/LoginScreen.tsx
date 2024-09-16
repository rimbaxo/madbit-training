import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Button from '../components/Button';
import TextInputComponent from '../components/TextInputComponent';
import { Colors, ENDPOINT_LOGIN } from '../constants';
import { useAppDispatch } from '../hooks/useAppDispatch';
import useFetch from '../hooks/useFetch';
import { setAccessToken } from '../redux/authSlice';
import { FetchParams, LoginBody, LoginResponse } from '../types';

const LoginScreen: React.FC = () => {
  const [username, setUsername] = useState<string>('testblog.aronnebrivio@dispostable.com');
  const [password, setPassword] = useState<string>('password');

  const insets = useSafeAreaInsets();

  const backgroundStyle = {
    paddingTop: insets.top,
    paddingBottom: insets.bottom,
    paddingLeft: insets.left,
    paddingRight: insets.right
  };

  const body: LoginBody = {
    email: username,
    password
  };

  const fetchObj: FetchParams<LoginBody> = {
    endpoint: ENDPOINT_LOGIN,
    method: 'POST',
    body
  };

  const { loading, error, data, fetchData } = useFetch<LoginResponse, LoginBody>(fetchObj);

  const dispatch = useAppDispatch();

  const handleLogin = async () => {
    await fetchData();
  };

  useEffect(() => {
    if (data?.access_token) {
      dispatch(setAccessToken(data?.access_token));
    } else if (error) {
      Alert.alert('Errore di login', error);
    }
  }, [data, error, loading, dispatch]);

  return (
    <View style={[styles.container, backgroundStyle]}>
      <View />
      <View style={styles.containerLoginData}>
        <Text style={styles.label}>Username</Text>
        <TextInputComponent
          placeholder="Username o email"
          value={username}
          onChangeText={val => {
            setUsername(val);
          }}
        />
        <Text style={styles.label}>Password</Text>
        <TextInputComponent
          placeholder="Password"
          value={password}
          onChangeText={val => {
            setPassword(val);
          }}
          secureTextEntry
        />
      </View>
      <Button title={loading ? '...LoGgInG iN...' : 'LoGiN'} onPress={handleLogin} disabled={loading} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    alignItems: 'center',
    flexDirection: 'column',
    backgroundColor: Colors.backgroundColor
  },
  containerLoginData: {
    padding: 20,
    borderRadius: 15
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.light,
    marginBottom: 8
  }
});

export default LoginScreen;
