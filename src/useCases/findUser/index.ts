import { inject, injectable } from "inversify";
import { UserRepository } from "../../repository";
import { CustomError } from "../../utils/errors";
import { FindUserUseCaseInterface } from "./findUser.interface";

@injectable()
export class FindUserUseCase implements FindUserUseCaseInterface {
  constructor(
    @inject("UserRepository")
    private readonly repository: UserRepository
  ) {}

  async findUser(id: number) {
    try {
      const user = await this.repository.findOne(id);

      if (!user) {
        throw new CustomError("Usuário não encontrado.", 404);
      }

      const { password, ...userWithoutPassword } = user;
      return userWithoutPassword;
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }
      throw new CustomError("Erro ao buscar usuário.", 500);
    }
  }
}
