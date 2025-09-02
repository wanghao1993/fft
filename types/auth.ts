export interface User {
  id: string;
  username: string;
  email: string;
  isAdmin: boolean;
  status: string;
}

export interface LoginRes {
  access_token: string;
  user: User;
}
