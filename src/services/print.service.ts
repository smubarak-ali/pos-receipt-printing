import ReceiptPrinterEncoder from '@point-of-sale/receipt-printer-encoder';
import SystemReceiptPrinter from '@point-of-sale/system-receipt-printer';
import { PrintRequest } from "../utils/model/print";

export class PrintService {

    constructor() { }

    print = async (receipt: PrintRequest) => {
        const encoder = new ReceiptPrinterEncoder({
            feedBeforeCut: 6
        });

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
            .cut();

        /* Print the receipt */
        const receiptPrinter = new SystemReceiptPrinter({
            name: 'PRP088 III Printer',
        });

        await receiptPrinter.print(data.encode());
        await receiptPrinter.disconnect();
    }

}   