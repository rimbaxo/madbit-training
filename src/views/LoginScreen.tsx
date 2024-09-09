import React, {useState} from 'react';
import {View, Text, StyleSheet, Alert} from 'react-native';
import MyTextInput from '../components/MyTextInput';
import MyButton from '../components/MyButton';
import {Colors} from '../constants';
import {useDispatch} from 'react-redux';
import {setAccessToken, setIsLoggedIn } from '../redux/authSlice';
import useLogin from '../utils/useLogin'

const LoginScreen: React.FC = () => {

  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const {login, loading, error, accessToken} = useLogin();

  const dispatch = useDispatch();

  const handleLogin = async () => {

    await login(username, password);

    // Ha senso gestire lo stato della login in redux? pensaci.
    if (accessToken) {
      dispatch(setIsLoggedIn(true)); 
      dispatch(setAccessToken(accessToken));
       } else if (error) {
      Alert.alert('Errore di login', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.containerLoginData}>
        <Text style={styles.label}>Username</Text>
        <MyTextInput
          placeholder="Username o email"
          onChangeText={(val) => {
            setUsername(val)}
          }
        />
        <Text style={styles.label}>Password</Text>
        <MyTextInput
          placeholder="Password"
          onChangeText={(val) => {
            setPassword(val)}
          }
          secureTextEntry
        />
      </View>
      <MyButton
        title={loading ? 'Logging in...' : 'Login'}
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
    flexDirection: 'column',
    backgroundColor: Colors.backgroundColor,
  },
  containerLoginData: {
    backgroundColor: Colors.backgroundSurfaces,
    padding: 20,
    borderRadius: 15,
  },
  label: {
    fontSize: 16,
    color: Colors.light,
    marginBottom: 8,
  },
});

export default LoginScreen;
