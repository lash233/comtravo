import { NextFunction, Request, Response } from "express";
import { API_TIMEOUT } from "../utils/config";

/**
 * Ensures that any API request takes no longer than the defined API timeout
 */
export const checkTimeout = (req: Request, res: Response, next: NextFunction) => {
  res.setTimeout(API_TIMEOUT, function(){
      res.status(408).json({
        message: "We couldn't find any flights, but it may be temporary, please try again",
        status: 408
      })
      .end();
  });
  next();
}