import React from 'react';
import { TextInput, StyleSheet, TextInputProps } from 'react-native';
import { Colors } from '../constants';

interface CustomTextInputProps extends TextInputProps {
  placeholder: string;
}

const MyTextInput: React.FC<CustomTextInputProps> = ({placeholder}) => {
  return (
    <TextInput
      style={styles.input}
      placeholder={placeholder}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderColor: Colors.buttonDefault,
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
});

export default MyTextInput;
