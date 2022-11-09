import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { prisma } from "../utils/prisma";

const User = prisma.user;

export const getUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findUnique({
      where: {
        id: Number(req.params.id),
      },
      ...(!!req.query.complaints_count && {
        select: {
          _count: true,
        },
      }),
    });

    const { password, updatedAt, role, ...modifiedUser } = user!;

    res.status(StatusCodes.OK).json({ data: user });
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({ error });
  }
};
