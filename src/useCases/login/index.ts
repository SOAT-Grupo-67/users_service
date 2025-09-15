import { inject, injectable } from "inversify";
import { UserRepository } from "../../repository";
import { LoginDTO, LoginResponseDTO, ILoginUseCase } from "./login.interface";
import { CustomError } from "../../utils/errors";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

@injectable()
export class LoginUseCase implements ILoginUseCase {
  constructor(
    @inject("UserRepository")
    private userRepository: UserRepository
  ) {}

  async execute(data: LoginDTO): Promise<LoginResponseDTO> {
    const user = await this.userRepository.findByEmail(data.email);

    if (!user) {
      throw new CustomError("Email ou senha inválidos", 401);
    }

    const passwordMatch = await compare(data.password, user.password);

    if (!passwordMatch) {
      throw new CustomError("Email ou senha inválidos", 401);
    }

    const token = sign(
      {
        userId: user.id,
        email: user.email,
      },
      process.env.JWT_SECRET || "default_secret",
      {
        expiresIn: "1d",
      }
    );

    return {
      token,
      user: {
        id: user.id!,
        name: user.name,
        email: user.email,
      },
    };
  }
}
