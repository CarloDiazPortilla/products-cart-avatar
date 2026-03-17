import mongoose, { Document, Schema } from "mongoose";

export interface IUserDocument extends Document {
  name: string;
  email: string;
  password: string;
}

const userSchema = new Schema<IUserDocument>({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
}, {
  timestamps: false,
  versionKey: false
});

export const UserModel = mongoose.model<IUserDocument>("User", userSchema);
