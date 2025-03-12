import { Request, Response } from 'express';

import { PrintRequest } from '../utils/model/print';

export class PrintController {
    constructor() { }

    printDevago = async (req: Request, res: Response) => {
        const data: PrintRequest = req.body;

        res.send({ status: 'OK', data: req.body });
    }
}