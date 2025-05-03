import { Router } from "express";
import { PrintController } from "../controllers/print.controller";
import { MedicineController } from "../controllers/medicine.controller";

const printCtrl = new PrintController();
const medicineCtrl = new MedicineController();
const routes = Router();

routes.post('/v1/print/d', printCtrl.printAbdulHadi);
routes.post('/v1/medicine', medicineCtrl.save);
routes.get('/v1/medicine', medicineCtrl.getAll);
routes.delete('/v1/medicine/:id', medicineCtrl.delete);
routes.get('/v1/medicine/search', medicineCtrl.search);

export { routes };