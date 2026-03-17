import { IUserDocument } from "../../data/mongodb/models/user.model";

export class User {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly email: string,
    public readonly password: string,
  ) { }

  static toEntity = (doc: IUserDocument): User => {
    return new User(
      doc._id.toString(),
      doc.name.toString(),
      doc.email.toString(),
      doc.password.toString(),
    );
  };
}