export interface LoginForm {
  name?: string;
  email: string;
  password: string;
  checkPassword?: string;
}

export interface ProfileForm {
  name: string;
  email: string;
}
