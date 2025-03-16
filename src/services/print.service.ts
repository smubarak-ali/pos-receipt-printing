import ReceiptPrinterEncoder from '@point-of-sale/receipt-printer-encoder';
import SystemReceiptPrinter from '@point-of-sale/system-receipt-printer';
import { PrintRequest } from "../utils/model/print";

export class PrintService {

    constructor() { }

    print = async (receipt: PrintRequest) => {
        if (receipt == null || receipt == undefined || Object.keys(receipt).length <= 1) {
            return;
        }

        const encoder = new ReceiptPrinterEncoder({
            feedBeforeCut: 6
        });

        const data = encoder
            .initialize();

        encoder
            .invert(true)
            .box(
                { align: 'center', style: 'none', marginLeft: 10 }, 
                'Sale Invoice')
            .invert(false)
            .rule({ style: 'single' })
            .cut();


        const receiptPrinter = new SystemReceiptPrinter({
            name: 'PRP088 III Printer',
        });

        await receiptPrinter.print(data.encode());
        await receiptPrinter.disconnect();
    }

}   