import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import MyTextInput from '../components/textInput';
import MyButton from '../components/MyButton';
import { BackgroundColor } from '../../node_modules/@isaacs/cliui/node_modules/ansi-styles/index.d';
import { Colors } from '../constants';

const LoginScreen: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleLogin = () => {
    // Logica per il login
    if (username && password) {
      Alert.alert('Login Success', `Username: ${username}\nPassword: ${password}`);
    } else {
      Alert.alert('Login Failed', 'Please fill in both fields');
    }
  };

  return (
    <View style={styles.container}>
      <View> 
        <Text style={styles.label}>Username</Text>
        <MyTextInput
          placeholder="Username"
        />
        <Text style={styles.label}>Password</Text >
        <MyTextInput
          placeholder="Password"
        />
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
  
  label: {
    fontSize: 16,
    color: Colors.textDark,
    marginBottom: 8,
  },
});

export default LoginScreen;
