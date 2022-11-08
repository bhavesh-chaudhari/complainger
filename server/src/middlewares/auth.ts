import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import jwt, { JwtPayload } from "jsonwebtoken";

export const ensureAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "no token provided" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);

    // console.log(decoded)

    const { id, email } = decoded as any;

    req.user = { id, email };
    next();
  } catch (error) {
    console.log(error)
    res.status(400).json({ error: "Not authorized to access this route" });
  }
};

export const ensureAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
     const authHeader = req.headers.authorization;

     if (!authHeader || !authHeader.startsWith("Bearer ")) {
       return res.status(401).json({ error: "no token provided" });
     }

     const token = authHeader.split(" ")[1];
     const decoded = jwt.verify(token, process.env.JWT_SECRET as string);

     const { role } = decoded as any;

     if(role === "admin"){
      return next()
     }else{
      res.status(StatusCodes.FORBIDDEN).json({message: "Access Denied"})
     }
  } catch (error) {
    console.log(error)
    res.status(400).json({ error: "Not authorized to access this route" });
  }
};
