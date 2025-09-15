import { CreateUserRequestDTO } from "../../dtos/createUser.dto";
import { UserWithoutPassword } from "../../models/User";

export interface UpdateUserUseCaseInterface {
  updateUser(
    id: number,
    userData: Partial<CreateUserRequestDTO>
  ): Promise<UserWithoutPassword>;
}
