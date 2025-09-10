import { CreateUserRequestDTO } from "../dtos/createUser.dto";
import { User } from "../models/User";

export interface UserRepository {
  save: (userData: Partial<CreateUserRequestDTO>) => Promise<User>;
  findOne: (id: number) => Promise<User | null>;
  findMany: () => Promise<User[]>;
  findByCPF: (cpf: string) => Promise<User | null>;
  findByEmail: (email: string) => Promise<User | null>;
  softDelete: (id: number) => Promise<void>;
}
