export interface UserSignUp {
  fullName: string;
  userName: string;
  email: string;
  phone: string;
  address: string;
  dob: string; // Use Date if you want a Date type instead of a string for the date of birth
  password: string;
  confirmPassword: string;
}

export interface LoginInformation {
  user_name: string;
  password: string
}

export interface UserAuthentication {
  refreshToken: string;
  accessToken: string;
  userId: number;
  fullName: string;
  userName: string;
  roleName: string;
}