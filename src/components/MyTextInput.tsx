import React from 'react';
import {TextInput, StyleSheet, TextInputProps} from 'react-native';
import {Colors} from '../constants';

type CustomTextInputProps = TextInputProps & {
  placeholder: string;
};

const MyTextInput: React.FC<CustomTextInputProps> = ({
  placeholder,
  onChangeText,
  value,
}) => {
  return (
    <TextInput
      style={styles.input}
      value={value}
      placeholder={placeholder}
      placeholderTextColor={Colors.lilla}
      onChangeText={onChangeText}
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
