import { Request, Response } from 'express';

import { PrintRequest } from '../utils/model/print';
import { PrintService } from '../services/print.service';

export class PrintController {
    private readonly printService = new PrintService();

    constructor() { }

    printDevago = async (req: Request, res: Response) => {
        const data: PrintRequest = req.body;
        await this.printService.print(data);
        res.send({ status: 'OK', data: req.body });
    }
}