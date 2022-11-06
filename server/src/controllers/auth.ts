import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { prisma } from "../utils/prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const User = prisma.user;

(BigInt.prototype as any).toJSON = function () {
  return this.toString();
};

export const signup = async (req: Request, res: Response) => {
  try {
    const user = await User.findUnique({
      where: {
        email: req.body.email
      },
    });

    if (user) {
      return res
        .status(StatusCodes.CONFLICT)
        .json({ msg: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const newUser = await User.create({
      data: { ...req.body, password: hashedPassword },
    });

    const { password, ...userWithoutPassword } = newUser;

    const token = jwt.sign(
      { id: newUser.id, email: newUser.email },
      process.env.JWT_SECRET as string,
      { expiresIn: "30d" }
    );

    res.status(StatusCodes.OK).json({ ...userWithoutPassword, token });
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json(error);
    console.log(error);
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    console.log(req.body);

    if (!email || !password) {
      return res
        .status(401)
        .json({ error: "Please provide email and password" });
    }

    const user = await User.findUnique({
      where: {
        email: email,
      },
    });

    if (!user) {
      return res.status(400).json({ error: "Invalid Credentials" });
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      user.password as string
    );

    if (!isPasswordCorrect) {
      return res.status(400).json({ error: "Invalid Credentials" });
    }

    const token = jwt.sign(
      { id: user.id, email },
      process.env.JWT_SECRET as string,
      { expiresIn: "30d" }
    );

    const key = "password";
    delete (user as any)[key];

    res.status(200).json({ ...user, token });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
  }
};
