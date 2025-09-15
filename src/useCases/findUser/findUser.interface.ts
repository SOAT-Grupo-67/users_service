import { UserWithoutPassword } from "../../models/User";

export interface FindUserUseCaseInterface {
  findUser(id: number): Promise<UserWithoutPassword | undefined>;
}
