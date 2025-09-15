import { inject, injectable } from "inversify";
import { CreateUserRequestDTO } from "../dtos/createUser.dto";
import { UserWithoutPassword } from "../models/User";
import { CreateUserUseCaseInterface } from "../useCases/createUser/createUser.interface";
import { DeleteUserUseCaseInterface } from "../useCases/deleteUser/deleteUser.interface";
import { FindUserUseCaseInterface } from "../useCases/findUser/findUser.interface";
import { GetUsersUseCaseInterface } from "../useCases/getUsers/getUser.interface";
import {
  ILoginUseCase,
  LoginDTO,
  LoginResponseDTO,
} from "../useCases/login/login.interface";
import { UpdateUserUseCaseInterface } from "../useCases/updateUser/updateUser.interface";

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
    private deleteUserUseCase: DeleteUserUseCaseInterface,
    @inject("LoginUseCase")
    private loginUseCase: ILoginUseCase
  ) {}

  async createUser(user: CreateUserRequestDTO): Promise<UserWithoutPassword> {
    return this.createUserUseCase.createUser(user);
  }

  async findUser(id: number): Promise<UserWithoutPassword | undefined> {
    return this.findUserUseCase.findUser(id);
  }

  async getUsers(): Promise<UserWithoutPassword[]> {
    return this.getUsersUseCase.getUsers();
  }

  async updateUser(
    id: number,
    user: Partial<CreateUserRequestDTO>
  ): Promise<UserWithoutPassword> {
    return this.updateUserUseCase.updateUser(id, user);
  }

  async deleteUser(id: number): Promise<void> {
    return this.deleteUserUseCase.deleteUser(id);
  }

  async login(loginData: LoginDTO): Promise<LoginResponseDTO> {
    return this.loginUseCase.execute(loginData);
  }
}
