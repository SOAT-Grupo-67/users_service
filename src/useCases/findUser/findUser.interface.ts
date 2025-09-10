import { User } from "../../models/User";

export interface FindUserUseCaseInterface {
  findUser(id: number): Promise<User | undefined>;
}
