export type AuthUser = {
  id: string;
  name: string;
  email: string;
  role?: "ADMIN" | "USER";
};

export type UserResponse = {
  token: string;
  registredUser: {
    id: string;
    name: string;
    email: string;
  };
};

export type UserEmail = {
  email: string;
};

export type LoginCredentialsDTO = {
  email: string;
  password: string;
};
