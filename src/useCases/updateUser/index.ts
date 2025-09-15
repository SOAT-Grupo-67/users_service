import { inject, injectable } from "inversify";
import { CreateUserRequestDTO } from "../../dtos/createUser.dto";
import { UserRepository } from "../../repository";
import { CustomError } from "../../utils/errors";
import { UpdateUserUseCaseInterface } from "./updateUser.interface";

@injectable()
export class UpdateUserUseCase implements UpdateUserUseCaseInterface {
  constructor(
    @inject("UserRepository") private readonly repository: UserRepository
  ) {}

  async updateUser(id: number, userData: Partial<CreateUserRequestDTO>) {
    try {
      const { email, cpf } = userData;

      const exists = await this.repository.findOne(id);
      if (!exists) {
        throw new CustomError("Usuário não encontrado.", 404);
      }

      if (cpf) {
        throw new CustomError("CPF não deve ser alterado", 400);
      }

      if (email) {
        const emailExists = await this.repository.findByEmail(email);
        if (emailExists && emailExists.id !== id) {
          throw new CustomError("Este email já está cadastrado", 400);
        }
      }

      const updatedUser = await this.repository.save({ id, ...userData });

      const { password, ...userWithoutPassword } = updatedUser;
      return userWithoutPassword;
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }
      throw new CustomError("Erro ao atualizar usuário.", 500);
    }
  }
}
