// TYPES PER REDUX
export type AuthState = {
  accessToken: string | undefined;
  fullName: string | undefined;
  email: string | undefined;
  id: number | undefined;
};

export type PostsState = {
  posts: PostType[];
  loading: boolean;
  error: string | null;
};

// TYPES PER IL LOGIN
export type LoginResponse = {
  access_token: string;
  token_type: string;
  expires_in: number;
};

export type UseFetchState<T> = {
  loading: boolean;
  error: string | null;
  data: T | undefined;
};

export type LoginBody = {
  email: string;
  password: string;
};

//TYPES PER IL GETME
export type GetMeType = {
  email: string;
  full_name: string;
  id: number;
};

//TYPES PER I POSTS
export type PostType = {
  id: number;
  title: string;
  text: string;
  created_at: string;
  updated_at: string;
  comments_count: number;
  user: {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
    created_at: string;
    full_name: string;
  };
};

export type CommentType = {
  id: number;
  text: string;
};

export type PostProps = {
  title: string;
  text: string;
  created_at: string;
  comments_count: number;
  fullName: string;
};

// TYPES PER USERHEADER
export type HeaderProps = {
  name: string;
  email: string;
};

// TYPES PER USEFETCH
export type FetchMethod = 'POST' | 'GET' | 'PUT' | 'DELETE';

export type FetchParams<R = undefined> = {
  endpoint: string;
  method: FetchMethod;
  body?: R;
};

//TYPES PER LA NAVIGATION
// src/types/navigation.ts
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { StackNavigationProp } from '@react-navigation/stack';

export type HomeStackParamList = {
  Home: undefined;
  PostDetails: { postId: number };
};

export type BottomTabParamList = {
  HomeNavigation: undefined;
  UserInfo: undefined;
};

export type TabNavigationProp = BottomTabNavigationProp<BottomTabParamList>;
export type HomeNavigationProp = StackNavigationProp<HomeStackParamList>;
