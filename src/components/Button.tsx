import React from 'react';
import { Pressable, PressableProps, StyleSheet, Text } from 'react-native';
import { Colors } from '../constants';

type CustomButtonProps = PressableProps & {
  title: string;
  onPress: () => void;
};

const Button: React.FC<CustomButtonProps> = ({ title, onPress }) => {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        {
          backgroundColor: pressed ? Colors.blue : Colors.azure
        }
      ]}
    >
      <Text style={styles.buttonText}>{title}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    width: '50%',
    paddingVertical: 12,
    paddingHorizontal: 24,
    margin: 10,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.azure
  },
  buttonText: {
    color: Colors.backgroundSurfaces,
    fontSize: 16,
    fontWeight: 'bold'
  }
});

export default Button;
