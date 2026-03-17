import { UserModel } from "../../data/mongodb/models/user.model";
import { User } from "../../domain/entities/user.entity";
import { IUserRepository } from "../../domain/repository/user.repository";

export class UserRepository implements IUserRepository {
  async findByEmail(email: string): Promise<User | null> {
    const doc = await UserModel.findOne({ email });
    if (!doc) return null;
    return User.toEntity(doc);
  }

  async findById(id: string): Promise<User | null> {
    const doc = await UserModel.findById(id);
    if (!doc) return null;
    return User.toEntity(doc);
  }
}
