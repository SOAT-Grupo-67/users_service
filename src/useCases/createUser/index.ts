import { inject, injectable } from "inversify";
import { CreateUserRequestDTO } from "../../dtos/createUser.dto";
import { UserRepository } from "../../repository";
import { CustomError } from "../../utils/errors";
import { CreateUserUseCaseInterface } from "./createUser.interface";

@injectable()
export class CreateUserUseCase implements CreateUserUseCaseInterface {
  constructor(
    @inject("UserRepository")
    private readonly repository: UserRepository
  ) {}

  async createUser(userData: CreateUserRequestDTO) {
    try {
      const { cpf, email } = userData;

      const exists = await this.repository.findByCPF(cpf);

      if (exists) {
        const message =
          exists.email === email
            ? "CPF e Email já cadastrado."
            : "CPF já cadastrado.";

        throw new CustomError(message, 400);
      }

      const newUser = await this.repository.save(userData);
      const { password, ...userWithoutPassword } = newUser;
      return userWithoutPassword;
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }
      throw new CustomError("Erro ao criar novo usuário", 500);
    }
  }
}
