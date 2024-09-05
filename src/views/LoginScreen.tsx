import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import MyTextInput from '../components/MyTextInput';
import MyButton from '../components/MyButton';
import {Colors} from '../constants';
import {useDispatch} from 'react-redux';
import {setLoginPressed} from '../redux/authSlice';

const LoginScreen: React.FC = () => {
  //const [username, setUsername] = useState<string>('');
  //const [password, setPassword] = useState<string>('');

  const dispatch = useDispatch();

  const handleLogin = () => {
    dispatch(setLoginPressed(true));
  };

  return (
    <View style={styles.container}>
      <View style={styles.containerLoginData}>
        <Text style={styles.label}>Username</Text>
        <MyTextInput placeholder="Username o email" />
        <Text style={styles.label}>Password</Text>
        <MyTextInput placeholder="Password" />
      </View>
      <MyButton title="Login" onPress={handleLogin} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    flexDirection: 'column',
    marginTop: 20,
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
