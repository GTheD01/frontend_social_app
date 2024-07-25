// USER TYPES

export interface RegisterUserProps {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  re_password: string;
}

export interface RegisterUserResponseProps {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
}

export interface LoginUserProps {
  email: string;
  password: string;
}

export interface LoginUserResponseProps {
  refresh: string;
  access: string;
}

export interface ActivateUserProps {
  uid?: string;
  token?: string;
}

export interface ResetPasswordProps {
  email: string;
}

export interface ResetPasswordConfirmProps {
  uid?: string;
  token?: string;
  new_password?: string;
  re_new_password?: string;
}
