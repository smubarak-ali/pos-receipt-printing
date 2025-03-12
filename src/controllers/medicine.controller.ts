import { Request, Response } from 'express';
import { MedicineService } from '../services/medicine.service';

export class MedicineController {
    private medicineService = new MedicineService();

    constructor() { }

    create = async (req: Request, res: Response) => {
        try {
            const data = await this.medicineService.create(req.body);
            res.send(data);

        } catch (error) {
            res.status(400).send(error);
        }
    }

    getAll = async (req: Request, res: Response) => {
        try {
            const data = await this.medicineService.getAll();
            res.send(data);

        } catch (error) {
            res.status(400).send(error);
        }
    }

    search = async (req: Request, res: Response) => {
        try {
            const data = await this.medicineService.search(`${req.query.name}`);
            res.send(data);

        } catch (error) {
            res.status(400).send(error);
        }
    }

    delete = async (req: Request, res: Response) => {
        try {
            await this.medicineService.delete(+req.params.id);
            res.send({ status: 'OK' });
        } catch (error) {
            res.status(400).send(error);
        }
    }
}