import { CreateUserRequestDTO } from "../../dtos/createUser.dto";
import { UserWithoutPassword } from "../../models/User";

export interface CreateUserUseCaseInterface {
  createUser(userData: CreateUserRequestDTO): Promise<UserWithoutPassword>;
}
