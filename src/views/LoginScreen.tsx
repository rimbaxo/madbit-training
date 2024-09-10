import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Alert} from 'react-native';
import MyTextInput from '../components/MyTextInput';
import MyButton from '../components/MyButton';
import {Colors, ENDPOINT_LOGIN} from '../constants';
import {setAccessToken} from '../redux/authSlice';
import useFetch from '../hooks/useFetch';
import {LoginBody, LoginResponse} from '../types';
import {useAppDispatch} from '../hooks/useAppDispatch';

const LoginScreen: React.FC = () => {
  const [username, setUsername] = useState<string>(
    'testblog.aronnebrivio@dispostable.com',
  );
  const [password, setPassword] = useState<string>('password');

  const body: LoginBody = {
    email: username,
    password,
  };

  const {loading, error, data, fetchData} = useFetch<LoginResponse, LoginBody>(
    ENDPOINT_LOGIN,
    'POST',
    body,
  );

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
    <View style={styles.container}>
      <View />
      <View style={styles.containerLoginData}>
        <Text style={styles.label}>Username</Text>
        <MyTextInput
          style={{height: 100}}
          placeholder="Username o email"
          value={username}
          onChangeText={val => {
            setUsername(val);
          }}
        />
        <Text style={styles.label}>Password</Text>
        <MyTextInput
          placeholder="Password"
          value={password}
          onChangeText={val => {
            setPassword(val);
          }}
          secureTextEntry
        />
      </View>
      <MyButton
        title={loading ? '...LoGgInG iN...' : 'LoGiN'}
        onPress={handleLogin}
        disabled={loading}
      />
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
    backgroundColor: Colors.backgroundColor,
  },
  containerLoginData: {
    padding: 20,
    borderRadius: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.light,
    marginBottom: 8,
  },
});

export default LoginScreen;
