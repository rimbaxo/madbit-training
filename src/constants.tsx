import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform, StatusBar } from 'react-native';
import RNBootSplash from 'react-native-bootsplash';

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
  alert: '#f6bd60'
};
// Questo indirizzo IP sta ad indicare per i simulatori l'indirizzo della macchina locale sempre anche nel caso in cui l'IP cambia (vale solo per android)
const IP_FOR_ANDROID = '10.0.2.2';
const IP_FOR_IOS = 'localhost';

const PORT = ':8080';
const PROTOCOL = 'http://';

export const BASE_URL = PROTOCOL + Platform.select({ ios: IP_FOR_IOS, android: IP_FOR_ANDROID }) + PORT;

export const ENDPOINT_LOGIN = '/auth/login';
export const ENDPOINT_GETME = '/auth/me';
export const ENDPOINT_POST = '/posts';

/*
export const getUserPostsEndpoint = (userId: number) =>
  ENDPOINT_POST + userId.toString();*/

export const formatReadableDate = (isoDate: string): string => {
  const date = new Date(isoDate);

  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  };

  return date.toLocaleDateString('it-IT', options);
};

export const DEFAULT_USERPIC_URI = 'https://via.placeholder.com/300x300.png/00ccaa?text=people+illum';

export const LIST = 'LIST';
export const FLAT = 'FLAT';
export const ANNULLA = 'ANNULLA';

// FUNZIONI PER IL TOKEN

export const saveToken = async (token: string) => {
  try {
    await AsyncStorage.setItem('authToken', token);
  } catch (e) {
    console.error('Errore durante il salvataggio del token:', e);
  }
};

export const getToken = async () => {
  try {
    const token = await AsyncStorage.getItem('authToken');
    if (token !== null) {
      return token;
    }
  } catch (e) {
    console.error('Errore durante il recupero del token:', e);
  }
  return null;
};

export const removeToken = async () => {
  try {
    await AsyncStorage.removeItem('authToken');
  } catch (e) {
    console.error('Errore durante la rimozione del token:', e);
  }
};

export const hideSplashScreen = () => {
  console.log('RNBootSplash', RNBootSplash);
  RNBootSplash.hide({ fade: true });
  console.log('ENTRO');
  if (Platform.OS === 'android') {
    StatusBar.setTranslucent(true);
    StatusBar.setBackgroundColor('transparent');
  }
};
