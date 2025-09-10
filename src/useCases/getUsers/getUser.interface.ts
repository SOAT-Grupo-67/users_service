import { User } from "../../models/User";

export interface GetUsersUseCaseInterface {
  getUsers(): Promise<User[]>;
}
