export interface DeleteUserUseCaseInterface {
  deleteUser(id: number): Promise<void>;
}
