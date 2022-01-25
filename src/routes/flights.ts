import { Request, Response, Router } from "express";
import { FlightsController } from "../controllers/flights";

const router = Router();

/**
 * Get all available flights
 */
router.get('/', (req: Request, res: Response) => {
  FlightsController.getFlights().then((response) => {
    if (res.headersSent) return;
    res.status(response.status).json({
      ...response
    })
  })
})

export default router;