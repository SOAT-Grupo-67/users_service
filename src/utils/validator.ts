import { z } from "zod";
import { CreateUserRequestDTO } from "../dtos/createUser.dto";

export const CreateUserValidator = {
  validate(input: any): CreateUserRequestDTO {
    const schema = z.object({
      name: z
        .string({
          error: "Nome deve ser uma string",
        })
        .min(1, "Nome obrigatório"),
      cpf: z
        .string({
          error: "CPF é obrigatório",
        })
        .regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, {
          message: "CPF deve estar no formato 999.999.999-99",
        }),
      email: z.email({
        error: "Email inválido",
      }),
      password: z.string({
        error: "Senha é obrigatória",
      }),
    });

    return schema.parse(input);
  },
};
