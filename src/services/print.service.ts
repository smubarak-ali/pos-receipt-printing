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
            language: 'esc-pos',
            columns: 48,
            feedBeforeCut: 4
        });

        const receiptPrinter = new SystemReceiptPrinter({
            name: 'PRP088 III Printer',
        });

        // const data = encoder
        //     .initialize();

        encoder
            .invert(true)
            .bold()
            .box(
                { align: 'center', style: 'none', paddingRight: 0 },
                'Sales Invoice'
            )
            .invert(false)
            .newline(2);

        encoder

        // const itemsArr = new Array();
        // const headings = new Array<string>();
        // headings.push("Product");
        // headings.push("Qty");
        // headings.push("Price");
        // headings.push("GST Rate");
        // headings.push("GST");
        // headings.push("Total");
        // itemsArr.push(headings);

        // receipt.items.map(x => {
        //     const strArr = new Array<string>();
        //     strArr.push(x.productName);
        //     strArr.push(x.quantity);
        //     strArr.push(x.price)
        //     strArr.push('0.00');
        //     strArr.push('0.00');
        //     strArr.push(x.totalAmount);
        //     itemsArr.push(strArr);
        // });

        // // console.log("itemsArr: ", JSON.stringify(itemsArr));
        // encoder
        //     .table(
        //         [
        //             { width: 18, marginRight: 0, align: 'left' },
        //             { width: 3, align: 'right' },
        //             { width: 7, align: 'right' },
        //             { width: 7, align: 'right' },
        //             { width: 6, align: 'right' },
        //             { width: 6, align: 'right' }
        //         ],
        //         itemsArr
        //     )

        //     .newline(2)
        //     .rule({ style: 'single'})
        //     .cut();

        await receiptPrinter.print(encoder.encode());
        await receiptPrinter.disconnect();
    }

}   