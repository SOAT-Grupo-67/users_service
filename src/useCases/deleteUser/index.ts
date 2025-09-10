import { inject, injectable } from "inversify";
import { UserRepository } from "../../repository";
import { DeleteUserUseCaseInterface } from "./deleteUser.interface";
import { CustomError } from "../../utils/errors";

@injectable()
export class DeleteUserUseCase implements DeleteUserUseCaseInterface {
  constructor(
    @inject("UserRepository")
    private readonly repository: UserRepository
  ) {}

  async deleteUser(id: number): Promise<void> {
    try {
      await this.repository.softDelete(id);
    } catch (error) {
      throw new CustomError("Erro ao inativar usuário.", 500);
    }
  }
}
