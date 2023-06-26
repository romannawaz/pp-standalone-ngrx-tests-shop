export interface Tokens {
  accessToken: string;
  refreshToken: string;
}

export interface RegisterData extends LoginData {
  name: string;
}

export interface LoginData {
  email: string;
  password: string;
}
