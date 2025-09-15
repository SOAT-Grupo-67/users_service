import { inject, injectable } from "inversify";
import { UserRepository } from "../../repository";
import { CustomError } from "../../utils/errors";
import { GetUsersUseCaseInterface } from "./getUser.interface";

@injectable()
export class GetUsersUseCase implements GetUsersUseCaseInterface {
  constructor(
    @inject("UserRepository")
    private readonly repository: UserRepository
  ) {}

  async getUsers() {
    try {
      const users = await this.repository.findMany();

      return users.map(({ password, ...user }) => user);
    } catch (error) {
      throw new CustomError("Erro ao listar usuários.", 500);
    }
  }
}
