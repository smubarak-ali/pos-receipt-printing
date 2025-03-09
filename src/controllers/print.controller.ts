
import ReceiptPrinterEncoder from '@point-of-sale/receipt-printer-encoder';
import SystemReceiptPrinter from '@point-of-sale/system-receipt-printer';
import { Request, Response } from 'express';

export class PrintController {
    constructor() { }

    print = async (req: Request, res: Response) => {
        const encoder = new ReceiptPrinterEncoder();

        const data = encoder
            .initialize()
            .line('The quick brown fox jumps over the lazy dog')
            .line('0123456789')
            .line('!@#$%^&*()')
            .line('abcdefghijklmnopqrstuvwxyz')
            .line('ABCDEFGHIJKLMNOPQRSTUVWXYZ')
            .line('The quick brown fox jumps over the lazy dog')
            .line('0123456789')
            .line('!@#$%^&*()')
            .line('abcdefghijklmnopqrstuvwxyz')
            .line('ABCDEFGHIJKLMNOPQRSTUVWXYZ')
            .line('https://nielsleenheer.com')
            .line('--------------------------------')
            .line('')
            .line('')
            .line('')
            .line('')
            .line('')
            .line('')
            .cut()
            .encode();

        /* Print the receipt */
        const receiptPrinter = new SystemReceiptPrinter({
            name: 'PRP088 III Printer',
        });

        await receiptPrinter.print(data);
        res.send({ status: 'OK' });
    }
}