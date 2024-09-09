import React from 'react';
import {TextInput, StyleSheet, TextInputProps} from 'react-native';
import {Colors} from '../constants';

type CustomTextInputProps = TextInputProps & {
  placeholder: string;
};

const MyTextInput: React.FC<CustomTextInputProps> = ({placeholder}) => {
  return (
    <TextInput
      style={styles.input}
      placeholder={placeholder}
      placeholderTextColor={Colors.lilla}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderColor: Colors.lightRose,
    borderBottomWidth: 1,
    marginBottom: 30,
    paddingHorizontal: 8,
    borderRadius: 10,
    color: Colors.light,
  },
});

export default MyTextInput;
