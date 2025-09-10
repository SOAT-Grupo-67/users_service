import { mock } from "jest-mock-extended";
import { UpdateUserUseCase } from ".";
import { UserRepository } from "../../repository";
import { CustomError } from "../../utils/errors";
import { User } from "../../models/User";
import { CreateUserRequestDTO } from "../../dtos/createUser.dto";

describe("UpdateUserUseCase", () => {
  let updateUserUseCase: UpdateUserUseCase;
  let mockRepository: jest.Mocked<UserRepository>;

  const mockUser: User = {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    cpf: "12345678900",
  };

  const mockUpdateData: Partial<CreateUserRequestDTO> = {
    name: "John Doe Updated",
    email: "john.updated@example.com",
  };

  beforeEach(() => {
    mockRepository = mock<UserRepository>();
    updateUserUseCase = new UpdateUserUseCase(mockRepository);
    jest.clearAllMocks();
  });

  describe("updateUser", () => {
    it("should update user successfully", async () => {
      mockRepository.findOne.mockResolvedValue(mockUser);
      mockRepository.findByEmail.mockResolvedValue(null);
      mockRepository.save.mockResolvedValue({ ...mockUser, ...mockUpdateData });

      const result = await updateUserUseCase.updateUser(1, mockUpdateData);

      expect(result).toEqual({ ...mockUser, ...mockUpdateData });
      expect(mockRepository.findOne).toHaveBeenCalledWith(1);
      expect(mockRepository.findByEmail).toHaveBeenCalledWith(
        mockUpdateData.email
      );
      expect(mockRepository.save).toHaveBeenCalledWith({
        id: 1,
        ...mockUpdateData,
      });
    });

    it("should allow updating email if its the same user", async () => {
      const sameUser = { ...mockUser, email: "new@example.com" };
      mockRepository.findOne.mockResolvedValue(mockUser);
      mockRepository.findByEmail.mockResolvedValue(sameUser);
      mockRepository.save.mockResolvedValue(sameUser);

      const result = await updateUserUseCase.updateUser(1, {
        email: "new@example.com",
      });

      expect(result).toEqual(sameUser);
      expect(mockRepository.findOne).toHaveBeenCalledWith(1);
      expect(mockRepository.findByEmail).toHaveBeenCalledWith(
        "new@example.com"
      );
      expect(mockRepository.save).toHaveBeenCalledWith({
        id: 1,
        email: "new@example.com",
      });
    });

    it("should throw error when user is not found", async () => {
      mockRepository.findOne.mockResolvedValue(null);

      await expect(
        updateUserUseCase.updateUser(1, mockUpdateData)
      ).rejects.toThrow(new CustomError("Usuário não encontrado.", 404));

      expect(mockRepository.findOne).toHaveBeenCalledWith(1);
      expect(mockRepository.save).not.toHaveBeenCalled();
    });

    it("should throw error when trying to update CPF", async () => {
      mockRepository.findOne.mockResolvedValue(mockUser);

      await expect(
        updateUserUseCase.updateUser(1, { cpf: "98765432100" })
      ).rejects.toThrow(new CustomError("CPF não deve ser alterado", 400));

      expect(mockRepository.findOne).toHaveBeenCalledWith(1);
      expect(mockRepository.save).not.toHaveBeenCalled();
    });

    it("should throw error when email already exists for different user", async () => {
      const differentUser = {
        ...mockUser,
        id: 2,
        email: "existing@example.com",
      };
      mockRepository.findOne.mockResolvedValue(mockUser);
      mockRepository.findByEmail.mockResolvedValue(differentUser);

      await expect(
        updateUserUseCase.updateUser(1, { email: "existing@example.com" })
      ).rejects.toThrow(new CustomError("Este email já está cadastrado", 400));

      expect(mockRepository.findOne).toHaveBeenCalledWith(1);
      expect(mockRepository.findByEmail).toHaveBeenCalledWith(
        "existing@example.com"
      );
      expect(mockRepository.save).not.toHaveBeenCalled();
    });

    it("should throw error when repository findOne fails", async () => {
      mockRepository.findOne.mockRejectedValue(new Error("Database error"));

      await expect(
        updateUserUseCase.updateUser(1, mockUpdateData)
      ).rejects.toThrow(new CustomError("Erro ao atualizar usuário.", 500));

      expect(mockRepository.findOne).toHaveBeenCalledWith(1);
      expect(mockRepository.save).not.toHaveBeenCalled();
    });

    it("should throw error when repository findByEmail fails", async () => {
      mockRepository.findOne.mockResolvedValue(mockUser);
      mockRepository.findByEmail.mockRejectedValue(new Error("Database error"));

      await expect(
        updateUserUseCase.updateUser(1, { email: "new@example.com" })
      ).rejects.toThrow(new CustomError("Erro ao atualizar usuário.", 500));

      expect(mockRepository.findOne).toHaveBeenCalledWith(1);
      expect(mockRepository.findByEmail).toHaveBeenCalledWith(
        "new@example.com"
      );
      expect(mockRepository.save).not.toHaveBeenCalled();
    });

    it("should throw error when repository save fails", async () => {
      mockRepository.findOne.mockResolvedValue(mockUser);
      mockRepository.findByEmail.mockResolvedValue(null);
      mockRepository.save.mockRejectedValue(new Error("Database error"));

      await expect(
        updateUserUseCase.updateUser(1, mockUpdateData)
      ).rejects.toThrow(new CustomError("Erro ao atualizar usuário.", 500));

      expect(mockRepository.findOne).toHaveBeenCalledWith(1);
      expect(mockRepository.findByEmail).toHaveBeenCalledWith(
        mockUpdateData.email
      );
      expect(mockRepository.save).toHaveBeenCalledWith({
        id: 1,
        ...mockUpdateData,
      });
    });
  });
});
