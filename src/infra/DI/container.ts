import { Container } from "inversify";
import { UserController } from "../../controller";
import { UserRepository } from "../../repository";
import { UserRepositoryImpl } from "../TypeORM/repository";
import { CreateUserUseCaseInterface } from "../../useCases/createUser/createUser.interface";
import { CreateUserUseCase } from "../../useCases/createUser";
import { FindUserUseCaseInterface } from "../../useCases/findUser/findUser.interface";
import { FindUserUseCase } from "../../useCases/findUser";
import { GetUsersUseCaseInterface } from "../../useCases/getUsers/getUser.interface";
import { GetUsersUseCase } from "../../useCases/getUsers";
import { UpdateUserUseCaseInterface } from "../../useCases/updateUser/updateUser.interface";
import { UpdateUserUseCase } from "../../useCases/updateUser";
import { DeleteUserUseCaseInterface } from "../../useCases/deleteUser/deleteUser.interface";
import { DeleteUserUseCase } from "../../useCases/deleteUser";

const container = new Container();

container.bind<UserController>("UserController").to(UserController);
container.bind<UserRepository>("UserRepository").to(UserRepositoryImpl);
container
  .bind<CreateUserUseCaseInterface>("CreateUserUseCase")
  .to(CreateUserUseCase);
container.bind<FindUserUseCaseInterface>("FindUserUseCase").to(FindUserUseCase);
container.bind<GetUsersUseCaseInterface>("GetUsersUseCase").to(GetUsersUseCase);
container
  .bind<UpdateUserUseCaseInterface>("UpdateUserUseCase")
  .to(UpdateUserUseCase);
container
  .bind<DeleteUserUseCaseInterface>("DeleteUserUseCase")
  .to(DeleteUserUseCase);

export { container };
