import { Router } from "express";
import { MedicineController } from "../controllers/medicine.controller";

const medicineCtrl = new MedicineController();
const routes = Router();

routes.post('/v1/medicine', medicineCtrl.save);
routes.get('/v1/medicine', medicineCtrl.getAll);
routes.delete('/v1/medicine/:id', medicineCtrl.delete);
routes.get('/v1/medicine/search', medicineCtrl.search);

export { routes };