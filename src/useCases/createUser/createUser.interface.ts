import { CreateUserRequestDTO } from "../../dtos/createUser.dto";
import { User } from "../../models/User";

export interface CreateUserUseCaseInterface {
  createUser(userData: CreateUserRequestDTO): Promise<User>;
}
