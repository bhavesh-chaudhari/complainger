import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { prisma } from "../utils/prisma";

const User = prisma.user;

export const getUser = async (req: Request, res: Response) => {
  try {

    console.log(req.params.id)
    
    const user = await User.findUnique({
      where: {
        id: Number(req.params.id),
      },
    });

    const {password, updatedAt, role, ...modifiedUser} = user! 

    res.status(StatusCodes.OK).json({ data: modifiedUser });
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({ error });
  }
};
