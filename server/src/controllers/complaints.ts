import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { prisma } from "../utils/prisma";

const Complaint = prisma.complaint;
const User = prisma.user;

export const getAllComplaints = async (req: Request, res: Response) => {
  try {
    const complaints = await Complaint.findMany({
      include: {
        created_by: {
          select: {
            first_name: true,
            last_name: true,
            role: true
          },
        },
      },
    });

    res.status(StatusCodes.OK).json({ data: complaints });
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({ error });
  }
};

export const getUserComplaints = async (req: Request, res: Response) => {
  try {
    const complaints = await User.findUnique({
      where: {
        id: Number(req.params.id),
      },
      select: {
        complaints: true,
      },
    });

    res.status(StatusCodes.OK).json({ data: complaints });
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({ error });
  }
};

export const getSingleComplaint = async (req: Request, res: Response) => {
  try {
    const complaint = await Complaint.findUnique({
      where: {
        id: Number(req.params.id),
      },
    });

    if(complaint?.userId !== req.user.id){
      return res
        .status(StatusCodes.FORBIDDEN)
        .json({ message: "Can't access complaints of another user" });
    }

    res.status(StatusCodes.OK).json({ data: complaint });
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({ error });
  }
};

export const createComplaint = async (req: Request, res: Response) => {
  const { title, description, type } = req.body;

  try {
    const createdComplaint = await Complaint.create({
      data: {
        title,
        description,
        type,
        userId: Number(req.user?.id),
      },
    });

    res.status(StatusCodes.OK).json({ data: createdComplaint });
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({ error });
  }
};

export const updateComplaint = async (req: Request, res: Response) => {
  try {

    if (Object.keys(req.body).length === 0) {
      return res
        .status(StatusCodes.NOT_ACCEPTABLE)
        .json({ message: "nothing to update" });
    }

    const updatedComplaint = await Complaint.update({
      data: req.body,
      where: {
        id: Number(req.params.id),
      },
    });

    res.status(StatusCodes.OK).json({ data: updatedComplaint });
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({ error });
  }
};

export const deleteComplaint = async (req: Request, res: Response) => {
  try {
    const deletedComplaint = await Complaint.delete({
      where: {
        id: Number(req.params.id),
      },
    });

    res
      .status(StatusCodes.OK)
      .json({ data: deleteComplaint, message: "deleted" });
  } catch (error) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: (error as any).meta.cause || error });
  }
};
