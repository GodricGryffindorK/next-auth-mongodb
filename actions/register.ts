"use server";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export const userRegister = async (values: any) => {
  const { email, password, name } = values;

  try {
    // await run();
    console.log(111);
    await connectDB();
    const userFound = await User.findOne({ email });
    console.log(userFound);
    if (userFound) {
      return {
        error: "Email already exists!",
      };
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      name,
      email,
      password: hashedPassword,
    });
    await user.save();
  } catch (e) {
    console.log(e);
  }
};
