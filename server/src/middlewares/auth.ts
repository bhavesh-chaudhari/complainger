import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import jwt, { JwtPayload } from 'jsonwebtoken';

export const ensureAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'no token provided' });
    }

    const token = authHeader.split(' ')[1];

    if (token === 'undefined') {
      return res.status(400).json('no token');
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);

    const { id, email, role } = decoded as {
      id: number;
      email: string;
      role: string;
    };

    req.user = { id, email, role };
    next();
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: 'Not authorized to access this route' });
  }
};

export const ensureAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'no token provided' });
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);

    const { role } = decoded as any;

    console.log(role);

    if (role === 'admin') {
      return next();
    } else {
      return res
        .status(StatusCodes.FORBIDDEN)
        .json({ message: 'Access Denied' });
    }
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ error: 'Not authorized to access this route' });
  }
};
