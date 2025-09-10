import { mock } from "jest-mock-extended";
import { DeleteUserUseCase } from ".";
import { UserRepository } from "../../repository";
import { CustomError } from "../../utils/errors";

describe("DeleteUserUseCase", () => {
  let deleteUserUseCase: DeleteUserUseCase;
  let mockRepository: jest.Mocked<UserRepository>;

  beforeEach(() => {
    mockRepository = mock<UserRepository>();
    deleteUserUseCase = new DeleteUserUseCase(mockRepository);
  });

  describe("deleteUser", () => {
    it("should soft delete user successfully", async () => {
      mockRepository.softDelete.mockResolvedValue(undefined);

      await expect(deleteUserUseCase.deleteUser(1)).resolves.not.toThrow();

      expect(mockRepository.softDelete).toHaveBeenCalledWith(1);
    });

    it("should throw error when repository softDelete fails", async () => {
      mockRepository.softDelete.mockRejectedValue(new Error("Database error"));

      await expect(deleteUserUseCase.deleteUser(1)).rejects.toThrow(
        new CustomError("Erro ao inativar usuário.", 500)
      );

      expect(mockRepository.softDelete).toHaveBeenCalledWith(1);
    });

    it("should throw error when user id is invalid", async () => {
      mockRepository.softDelete.mockRejectedValue(new Error("Invalid ID"));

      await expect(deleteUserUseCase.deleteUser(-1)).rejects.toThrow(
        new CustomError("Erro ao inativar usuário.", 500)
      );

      expect(mockRepository.softDelete).toHaveBeenCalledWith(-1);
    });

    it("should throw error when user id is zero", async () => {
      mockRepository.softDelete.mockRejectedValue(new Error("Invalid ID"));

      await expect(deleteUserUseCase.deleteUser(0)).rejects.toThrow(
        new CustomError("Erro ao inativar usuário.", 500)
      );

      expect(mockRepository.softDelete).toHaveBeenCalledWith(0);
    });
  });
});
