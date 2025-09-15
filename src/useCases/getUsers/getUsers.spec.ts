import { mock } from "jest-mock-extended";
import { GetUsersUseCase } from ".";
import { UserRepository } from "../../repository";
import { CustomError } from "../../utils/errors";
import { User } from "../../models/User";

describe("GetUsersUseCase", () => {
  let getUsersUseCase: GetUsersUseCase;
  let mockRepository: jest.Mocked<UserRepository>;

  const mockUsers: User[] = [
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      cpf: "12345678900",
      password: "123456",
    },
    {
      id: 2,
      name: "Jane Doe",
      email: "jane@example.com",
      cpf: "98765432100",
      password: "123456",
    },
  ];

  beforeEach(() => {
    mockRepository = mock<UserRepository>();
    getUsersUseCase = new GetUsersUseCase(mockRepository);
  });

  describe("getUsers", () => {
    it("should get users successfully", async () => {
      mockRepository.findMany.mockResolvedValue(mockUsers);

      const result = await getUsersUseCase.getUsers();

      const expectedUsers = mockUsers.map(({ password, ...user }) => user);
      expect(result).toEqual(expectedUsers);
      expect(mockRepository.findMany).toHaveBeenCalled();
    });

    it("should return empty array when no users exist", async () => {
      mockRepository.findMany.mockResolvedValue([]);

      const result = await getUsersUseCase.getUsers();

      expect(result).toEqual([]);
      expect(mockRepository.findMany).toHaveBeenCalled();
    });

    it("should throw error when repository findMany fails", async () => {
      mockRepository.findMany.mockRejectedValue(new Error("Database error"));

      await expect(getUsersUseCase.getUsers()).rejects.toThrow(
        new CustomError("Erro ao listar usuários.", 500)
      );

      expect(mockRepository.findMany).toHaveBeenCalled();
    });

    it("should handle repository timeout", async () => {
      mockRepository.findMany.mockRejectedValue(new Error("Timeout"));

      await expect(getUsersUseCase.getUsers()).rejects.toThrow(
        new CustomError("Erro ao listar usuários.", 500)
      );

      expect(mockRepository.findMany).toHaveBeenCalled();
    });
  });
});
