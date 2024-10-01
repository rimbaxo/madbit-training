import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import React from 'react';
import { Pressable, PressableProps, StyleSheet, Text } from 'react-native';
import { Colors } from '../constants';

type ButtonVariant = 'ANNULLA' | 'ICON';

type CustomButtonProps = PressableProps & {
  title: string;
  onPress: () => void;
  variant?: ButtonVariant;
};

const Button: React.FC<CustomButtonProps> = ({ title, onPress, variant }) => {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        {
          backgroundColor: pressed ? Colors.blue : Colors.azure
        },
        {
          backgroundColor: variant ? Colors.darkRose : Colors.azure
        }
      ]}
    >
      {variant === 'ICON' ? <FontAwesomeIcon icon={faPlus} color={Colors.backgroundSurfaces} /> : null}
      <Text style={styles.buttonText}>{title}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    display: 'flex',
    flexDirection: 'row',
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
