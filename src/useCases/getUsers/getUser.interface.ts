import { UserWithoutPassword } from "../../models/User";

export interface GetUsersUseCaseInterface {
  getUsers(): Promise<UserWithoutPassword[]>;
}
