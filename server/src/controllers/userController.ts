import { Request, RequestHandler, Response } from "express";
import User from "../models/UserModel";
import bcrypt from "bcryptjs";

export const registerUser: RequestHandler = async (
  req: Request,
  res: Response
) => {
  console.log("request received", req.body);
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    res.status(400).json({ message: "Username, email, password required" });
    return;
  }
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.json({ message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ message: "user registered" });
    return;
  } catch (error) {
    res.status(500).json({ message: "Error Occured", error });
    return;
  }
};
export const userLogin = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      res.status(401).json({ message: "User not found" });
      return;
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      res.status(401).json({ message: "Email or Password incorrect" });
      return;
    }
    res.json({ message: "Login Successful" });
    return;
  } catch (error) {
    res.status(500).json({ message: "Error Occured", error });
    return;
  }
};
