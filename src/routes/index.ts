import { Router } from "express";
import { PrintController } from "../controllers/print.controller";

const printCtrl = new PrintController();
const routes = Router();

routes.post('/v1/print', printCtrl.print);

export { routes };