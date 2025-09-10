import { CreateUserRequestDTO } from "../../dtos/createUser.dto";
import { User } from "../../models/User";

export interface UpdateUserUseCaseInterface {
  updateUser(
    id: number,
    userData: Partial<CreateUserRequestDTO>
  ): Promise<User>;
}
