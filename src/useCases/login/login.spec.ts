import { mock } from "jest-mock-extended";
import { UserRepository } from "../../repository";
import { LoginUseCase } from ".";
import { CustomError } from "../../utils/errors";
import { hash } from "bcryptjs";
import { User } from "../../models/User";

describe("LoginUseCase", () => {
  const mockUserRepository = mock<UserRepository>();
  const loginUseCase = new LoginUseCase(mockUserRepository);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should authenticate user with valid credentials", async () => {
    const password = "123456";
    const hashedPassword = await hash(password, 8);

    const mockUser = {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      password: hashedPassword,
      cpf: "12345678900",
    } as User;

    mockUserRepository.findByEmail.mockResolvedValue(mockUser);

    const result = await loginUseCase.execute({
      email: "john@example.com",
      password: "123456",
    });

    expect(result).toHaveProperty("token");
    expect(result.user).toEqual({
      id: mockUser.id,
      name: mockUser.name,
      email: mockUser.email,
    });
  });

  it("should throw UnauthorizedError when user is not found", async () => {
    mockUserRepository.findByEmail.mockResolvedValue(null);

    await expect(
      loginUseCase.execute({
        email: "nonexistent@example.com",
        password: "123456",
      })
    ).rejects.toThrow(CustomError);
  });

  it("should throw UnauthorizedError when password is incorrect", async () => {
    const mockUser = {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      password: await hash("123456", 8),
      cpf: "12345678900",
    } as User;

    mockUserRepository.findByEmail.mockResolvedValue(mockUser);

    await expect(
      loginUseCase.execute({
        email: "john@example.com",
        password: "wrong_password",
      })
    ).rejects.toThrow(CustomError);
  });
});
