export interface LoginDTO {
  email: string;
  password: string;
}

export interface LoginResponseDTO {
  token: string;
  user: {
    id: number;
    name: string;
    email: string;
  };
}

export interface ILoginUseCase {
  execute(data: LoginDTO): Promise<LoginResponseDTO>;
}
