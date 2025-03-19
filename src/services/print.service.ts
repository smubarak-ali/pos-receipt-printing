import ReceiptPrinterEncoder from '@point-of-sale/receipt-printer-encoder';
import SystemReceiptPrinter from '@point-of-sale/system-receipt-printer';
import { PrintRequest } from "../utils/model/print";
import { getRandomNumber } from "../utils/helper/number.helper";

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

        encoder
            .initialize()
            .invert(true)
            .bold()
            .box(
                { align: 'center', style: 'none', paddingRight: 0 },
                'Sales Invoice'
            )
            .invert(false)
            .newline(2);

        encoder
            .rule();

        encoder
            .table
            (
                [
                    { width: 24, align: 'left' },
                    { width: 24, align: 'right' }
                ],
                [
                    [`Invoice # ${getRandomNumber()}`, `Date: ${receipt.date.toISOString()}`],
                    [`Cashier: 700013`, `Customer: SYED YASIR`]
                ]
            )
            .rule();

        const headings = new Array<string>();
        headings.push("Product");
        headings.push("Qty");
        headings.push("Price");
        headings.push("GST Rate");
        headings.push("GST");
        headings.push("Total");

        encoder
            .table(
                this.tableHeader(),
                [headings]
            );

        encoder
            .rule();

        let totalItems = 0;
        receipt.items.map(x => {
            totalItems += totalItems + (+x.quantity);

            const strArr = new Array<string>();
            strArr.push(x.productName);
            strArr.push(x.quantity);
            strArr.push(x.price);
            strArr.push('0');
            strArr.push('0.00');
            strArr.push(x.totalAmount);

            encoder
                .table(
                    this.tableHeader(),
                    [strArr]
                )
                .rule()
        });

        encoder
            .table
            (
                [
                    { width: 25, align: 'left' },
                    { width: 15, align: 'right' }
                ],
                [
                    [`Item Sold       ${totalItems}`, ''],
                    [`No. of Item(s)  ${receipt.items.length}`]
                ]
            )
            .rule();

        encoder
            .table
            (
                [
                    { width: 25, align: 'right' },
                    { width: 23, align: 'right' }
                ],
                [
                    ['Sales Tax: ', '0.00'],
                    ['Total Amount: ', receipt.totalAmount],
                    ['Total Discount: ', receipt.totalDiscount],
                    ['POS Service Fee: ', '0'],
                    ['Charge (Payable): ', '0'],
                    ['Net Total (Received): ', receipt.netTotal]
                ]
            );

        encoder
            .text('Tenders')
            .rule();

        encoder
            .line('Payment Method');
        
        encoder
            .table
            (
                [
                    { width: 24, align: 'left' },
                    { width: 24, align: 'right' }
                ],
                [
                    ["CASH", `RS ${receipt.netTotal}`]
                ]
            )
            .newline();
            
        encoder
            .newline(2)
            .cut();

        await receiptPrinter.print(encoder.encode());
        await receiptPrinter.disconnect();
    }

    private tableHeader = () => {
        const arr = new Array<any>();
        arr.push({ width: 19, align: 'left' });
        arr.push({ width: 3, align: 'right' });
        arr.push({ width: 7, align: 'right' });
        arr.push({ width: 7, align: 'right' });
        arr.push({ width: 6, align: 'right' });
        arr.push({ width: 6, align: 'right' });
        return arr;
    }

}   