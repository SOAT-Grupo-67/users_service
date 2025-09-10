import { inject, injectable } from "inversify";
import { CreateUserRequestDTO } from "../dtos/createUser.dto";
import { CreateUserUseCaseInterface } from "../useCases/createUser/createUser.interface";
import { FindUserUseCaseInterface } from "../useCases/findUser/findUser.interface";
import { GetUsersUseCaseInterface } from "../useCases/getUsers/getUser.interface";
import { UpdateUserUseCaseInterface } from "../useCases/updateUser/updateUser.interface";
import { DeleteUserUseCaseInterface } from "../useCases/deleteUser/deleteUser.interface";
import { User } from "../models/User";

@injectable()
export class UserController {
  constructor(
    @inject("CreateUserUseCase")
    private createUserUseCase: CreateUserUseCaseInterface,
    @inject("FindUserUseCase")
    private findUserUseCase: FindUserUseCaseInterface,
    @inject("GetUsersUseCase")
    private getUsersUseCase: GetUsersUseCaseInterface,
    @inject("UpdateUserUseCase")
    private updateUserUseCase: UpdateUserUseCaseInterface,
    @inject("DeleteUserUseCase")
    private deleteUserUseCase: DeleteUserUseCaseInterface
  ) {}

  async createUser(user: CreateUserRequestDTO): Promise<User> {
    return this.createUserUseCase.createUser(user);
  }

  async findUser(id: number): Promise<User | undefined> {
    return this.findUserUseCase.findUser(id);
  }

  async getUsers(): Promise<User[]> {
    return this.getUsersUseCase.getUsers();
  }

  async updateUser(
    id: number,
    user: Partial<CreateUserRequestDTO>
  ): Promise<User> {
    return this.updateUserUseCase.updateUser(id, user);
  }

  async deleteUser(id: number): Promise<void> {
    return this.deleteUserUseCase.deleteUser(id);
  }
}
