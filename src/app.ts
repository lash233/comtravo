import express from "express";
import { checkTimeout } from "./middlewares/checkTimeout";
import routes from "./routes"
import swaggerUi from 'swagger-ui-express'
import swaggerDocument from './documentation/swagger.json'

const app = express();

// Middlewares
app.use(express.json());
app.use(checkTimeout);

// Routes
app.use('/api', routes);
// Documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

export default app;