import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { connectDB } from "../data/mongodb/init";
import { UserModel } from "../data/mongodb/models/user.model";

const seed = async () => {
  await connectDB();

  await UserModel.deleteMany({});

  const users = [
    { name: "Admin User", email: "admin@shop.com", password: "admin1234" },
    { name: "John Doe", email: "john@shop.com", password: "john1234" },
  ];

  for (const u of users) {
    const hashed = await bcrypt.hash(u.password, 10);
    await UserModel.create({ ...u, password: hashed });
    console.log(`User created: ${u.email} / ${u.password}`);
  }

  console.log("Seed completed");
  await mongoose.disconnect();
  process.exit(0);
};

seed();
