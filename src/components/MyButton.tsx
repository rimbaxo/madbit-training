import React from 'react';
import { Pressable, Text, StyleSheet, View, PressableProps } from 'react-native';
import { Colors } from '../constants';


interface CustomButtonProps extends PressableProps {
  title: string;
  onPress: () => void;
}

const MyButton: React.FC<CustomButtonProps> = ({ title, onPress,}) => {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        { backgroundColor: pressed ? Colors.buttonPressed : Colors.buttonDefault }, // Cambia colore quando premuto
      ]}
    >
      <Text style={styles.buttonText}>{title}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    margin: 10,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.buttonDefault, 
  },
  buttonText: {
    color: Colors.textDark,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default MyButton;
