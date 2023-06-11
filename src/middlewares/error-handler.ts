import { NextFunction, Request, Response } from "express";
import { VirifiError } from "../utils";

export const errorHandler = (error: VirifiError, request: Request, response: Response, next: NextFunction) => {
    if (error.status) {
      response.status(error.status).json({ error: error.message });
    } else if (error.message) {
      response.status(400).json({ error: error.message });
    } else {
      response.status(500).json({ error: error.message });
    }
    next();
};