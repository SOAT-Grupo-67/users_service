import { mock } from "jest-mock-extended";
import { FindUserUseCase } from ".";
import { UserRepository } from "../../repository";
import { CustomError } from "../../utils/errors";
import { User } from "../../models/User";

describe("FindUserUseCase", () => {
  let findUserUseCase: FindUserUseCase;
  let mockRepository: jest.Mocked<UserRepository>;

  const mockUser: User = {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    cpf: "12345678900",
  };

  beforeEach(() => {
    mockRepository = mock<UserRepository>();
    findUserUseCase = new FindUserUseCase(mockRepository);
  });

  describe("findUser", () => {
    it("should find user successfully", async () => {
      mockRepository.findOne.mockResolvedValue(mockUser);

      const result = await findUserUseCase.findUser(1);

      expect(result).toEqual(mockUser);
      expect(mockRepository.findOne).toHaveBeenCalledWith(1);
    });

    it("should throw error when user is not found", async () => {
      mockRepository.findOne.mockResolvedValue(null);

      await expect(findUserUseCase.findUser(1)).rejects.toThrow(
        new CustomError("Usuário não encontrado.", 404)
      );

      expect(mockRepository.findOne).toHaveBeenCalledWith(1);
    });

    it("should throw error when repository findOne fails", async () => {
      mockRepository.findOne.mockRejectedValue(new Error("Database error"));

      await expect(findUserUseCase.findUser(1)).rejects.toThrow(
        new CustomError("Erro ao buscar usuário.", 500)
      );

      expect(mockRepository.findOne).toHaveBeenCalledWith(1);
    });

    it("should throw error when user id is invalid", async () => {
      mockRepository.findOne.mockRejectedValue(new Error("Invalid ID"));

      await expect(findUserUseCase.findUser(-1)).rejects.toThrow(
        new CustomError("Erro ao buscar usuário.", 500)
      );

      expect(mockRepository.findOne).toHaveBeenCalledWith(-1);
    });

    it("should throw error when user id is zero", async () => {
      mockRepository.findOne.mockRejectedValue(new Error("Invalid ID"));

      await expect(findUserUseCase.findUser(0)).rejects.toThrow(
        new CustomError("Erro ao buscar usuário.", 500)
      );

      expect(mockRepository.findOne).toHaveBeenCalledWith(0);
    });
  });
});
