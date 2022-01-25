import { Router } from "express";
import flightsRouter from './flights'

const router = Router();
router.use('/flights', flightsRouter);
export default router;