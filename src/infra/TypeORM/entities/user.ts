import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from "typeorm";

@Entity("users")
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("varchar", { nullable: true })
  name: string;

  @Column("varchar", { nullable: true, unique: true })
  cpf: string;

  @Column("varchar", { nullable: true })
  email: string;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;

  @DeleteDateColumn({ name: "deleted_at" })
  deletedAt?: Date;
}
