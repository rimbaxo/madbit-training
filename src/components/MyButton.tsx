import React from 'react';
import {Pressable, Text, StyleSheet, PressableProps} from 'react-native';
import {Colors} from '../constants';

type CustomButtonProps = PressableProps & {
  title: string;
  onPress: () => void;
};

const MyButton: React.FC<CustomButtonProps> = ({title, onPress}) => {
  return (
    <Pressable
      onPress={onPress}
      style={({pressed}) => [
        styles.button,
        {
          backgroundColor: pressed ? Colors.blue : Colors.azure,
        }, // Cambia colore quando premuto
      ]}>
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
    backgroundColor: Colors.azure,
  },
  buttonText: {
    color: Colors.dark,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default MyButton;
