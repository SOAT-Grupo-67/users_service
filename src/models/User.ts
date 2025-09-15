export interface User {
  id?: number;
  name: string;
  cpf: string;
  email: string;
  password: string;
}

export type UserWithoutPassword = Omit<User, "password">;
