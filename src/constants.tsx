import {Platform} from 'react-native';

export const Colors = {
  lightRose: '#f4afc2',
  darkRose: '#f195ac',
  lilla: '#b28bc0',
  azure: '#00a8ff',
  blue: '#0266c8',
  backgroundColor: '#0c0c0c',
  backgroundSurfaces: '#252525',
  light: '#f4f4f4',
  dark: '#0c0c0c',
  alert: '#f6bd60',
};

const IP_FOR_ANDROID = '10.0.2.2';
const IP_FOR_IOS = 'localhost';

const PORT = ':8080';
const ENDPOINT = '/auth/login';
const PROTOCOL = 'http://';

export const BASE_URL =
  PROTOCOL +
  Platform.select({ios: IP_FOR_IOS, android: IP_FOR_ANDROID}) +
  PORT +
  ENDPOINT;
