// TYPES PER REDUX
export type AuthState = {
  accessToken: string | undefined;
  fullName: string | undefined;
  email: string | undefined;
  id: number | undefined;
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
