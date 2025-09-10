import { Repository } from "typeorm";
import { CreateUserRequestDTO } from "../../../dtos/createUser.dto";
import { UserRepository } from "../../../repository";
import { AppDataSource } from "../config";
import { UserEntity } from "../entities/user";

export class UserRepositoryImpl implements UserRepository {
  private repository: Repository<UserEntity>;

  constructor() {
    this.repository = AppDataSource.getRepository(UserEntity);
  }

  async save(userData: Partial<CreateUserRequestDTO>) {
    const newUser = this.repository.create(userData);

    return await this.repository.save(newUser);
  }

  async findOne(id: number) {
    const user = await this.repository.findOne({ where: { id } });

    return user;
  }

  async findMany() {
    const users = await this.repository.find();

    return users;
  }

  async softDelete(id: number) {
    await this.repository.softRemove({ id });
  }

  async findByCPF(cpf: string) {
    const user = await this.repository.findOne({ where: { cpf } });

    return user;
  }

  async findByEmail(email: string) {
    const user = await this.repository.findOne({ where: { email } });

    return user;
  }
}
