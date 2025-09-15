import { mock } from "jest-mock-extended";
import { CreateUserUseCase } from ".";
import { UserRepository } from "../../repository";
import { CustomError } from "../../utils/errors";
import { CreateUserRequestDTO } from "../../dtos/createUser.dto";
import { User } from "../../models/User";

describe("CreateUserUseCase", () => {
  let createUserUseCase: CreateUserUseCase;
  let mockRepository: jest.Mocked<UserRepository>;

  const mockUserData: CreateUserRequestDTO = {
    name: "John Doe",
    email: "john@example.com",
    cpf: "12345678900",
    password: "123456",
  };

  const mockExistingUser: User = {
    id: 1,
    ...mockUserData,
  };

  beforeEach(() => {
    mockRepository = mock<UserRepository>();
    createUserUseCase = new CreateUserUseCase(mockRepository);
  });

  describe("createUser", () => {
    it("should create a new user when CPF does not exist", async () => {
      mockRepository.findByCPF.mockResolvedValue(null);
      mockRepository.save.mockResolvedValue({ id: 1, ...mockUserData });

      const result = await createUserUseCase.createUser(mockUserData);

      const { password, ...expectedUser } = { id: 1, ...mockUserData };
      expect(result).toEqual(expectedUser);
      expect(mockRepository.findByCPF).toHaveBeenCalledWith(mockUserData.cpf);
      expect(mockRepository.save).toHaveBeenCalledWith(mockUserData);
    });

    it("should throw error when CPF already exists with same email", async () => {
      mockRepository.findByCPF.mockResolvedValue(mockExistingUser);

      await expect(createUserUseCase.createUser(mockUserData)).rejects.toThrow(
        new CustomError("CPF e Email já cadastrado.", 400)
      );

      expect(mockRepository.findByCPF).toHaveBeenCalledWith(mockUserData.cpf);
      expect(mockRepository.save).not.toHaveBeenCalled();
    });

    it("should throw error when CPF exists with different email", async () => {
      const existingUserDifferentEmail = {
        ...mockExistingUser,
        email: "different@example.com",
      };
      mockRepository.findByCPF.mockResolvedValue(existingUserDifferentEmail);

      await expect(createUserUseCase.createUser(mockUserData)).rejects.toThrow(
        new CustomError("CPF já cadastrado.", 400)
      );

      expect(mockRepository.findByCPF).toHaveBeenCalledWith(mockUserData.cpf);
      expect(mockRepository.save).not.toHaveBeenCalled();
    });

    it("should throw error when findByCPF fails", async () => {
      mockRepository.findByCPF.mockRejectedValue(new Error("Database error"));

      await expect(createUserUseCase.createUser(mockUserData)).rejects.toThrow(
        new CustomError("Erro ao criar novo usuário", 500)
      );

      expect(mockRepository.findByCPF).toHaveBeenCalledWith(mockUserData.cpf);
      expect(mockRepository.save).not.toHaveBeenCalled();
    });

    it("should throw error when save fails", async () => {
      mockRepository.findByCPF.mockResolvedValue(null);
      mockRepository.save.mockRejectedValue(new Error("Database error"));

      await expect(createUserUseCase.createUser(mockUserData)).rejects.toThrow(
        new CustomError("Erro ao criar novo usuário", 500)
      );

      expect(mockRepository.findByCPF).toHaveBeenCalledWith(mockUserData.cpf);
      expect(mockRepository.save).toHaveBeenCalledWith(mockUserData);
    });
  });
});
