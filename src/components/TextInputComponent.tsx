import React from 'react';
import { StyleSheet, TextInput, TextInputProps } from 'react-native';
import { Colors } from '../constants';

type CustomTextInputProps = TextInputProps & {
  placeholder: string;
};

const TextInputComponent: React.FC<CustomTextInputProps> = ({ style, ...props }) => {
  return (
    <TextInput
      {...props}
      style={[styles.input, style]}
      //value={value}
      //placeholder={placeholder}
      placeholderTextColor={Colors.lilla}
      // onChangeText={onChangeText}
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
    color: Colors.light
  }
});

export default TextInputComponent;
