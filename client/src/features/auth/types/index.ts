export type AuthUser = {
  id: string;
  name: string;
  email: string;
  role?: "ADMIN" | "USER";
};

export type UserResponse = {
  token: string;
  email: UserEmail;
};

export type UserEmail = {
  email: string;
};

export type LoginCredentialsDTO = {
  email: string;
  password: string;
};
