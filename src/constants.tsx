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
// Questo indirizzo IP sta ad indicare per i simulatori l'indirizzo della macchina locale sempre anche nel caso in cui l'IP cambia (vale solo per android)
const IP_FOR_ANDROID = '10.0.2.2';
const IP_FOR_IOS = 'localhost';

const PORT = ':8080';
const PROTOCOL = 'http://';

export const BASE_URL =
  PROTOCOL + Platform.select({ios: IP_FOR_IOS, android: IP_FOR_ANDROID}) + PORT;

export const ENDPOINT_LOGIN = '/auth/login';
export const ENDPOINT_GETME = '/auth/me';
export const ENDPOINT_POST = '/posts/user/';

export const getUserPostsEndpoint = (userId: number) => ENDPOINT_POST + userId;
