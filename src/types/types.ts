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
