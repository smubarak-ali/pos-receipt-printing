import ReceiptPrinterEncoder from '@point-of-sale/receipt-printer-encoder';
import SystemReceiptPrinter from '@point-of-sale/system-receipt-printer';
import { PrintRequest } from "../utils/model/print";
import { get13DigitNumber, getRandomNumber } from "../utils/helper/number.helper";
import numbro from 'numbro';
import dayjs from "dayjs";

export class PrintService {

    constructor() { }

    print = async (receipt: PrintRequest) => {
        if (receipt == null || receipt == undefined || Object.keys(receipt).length <= 1) {
            return;
        }

        const encoder = new ReceiptPrinterEncoder({
            language: 'esc-pos',
            columns: 48,
            feedBeforeCut: 3
        });

        const receiptPrinter = new SystemReceiptPrinter({
            name: 'PRP088 III Printer',
        });

        const invoiceNo = getRandomNumber();
        encoder
            .initialize()
            .invert(true)
            .bold()
            .font('A')
            .box
            (
                { align: 'center', style: 'none' },
                'SALES INVOICE'
            )
            .invert(false)
            .newline();

        encoder
            .align('center')
            .line('ABDUL HADI MEDICAL & GENERAL STORE')
            .align('center')
            .line('Shop No. 2, Plot # 1372/2, Azizabad')
            .align('center')
            .line('Contact No. 0306-3736034')
            .newline()
            .rule();

        encoder
            .table
            (
                [
                    { width: 24, align: 'left' },
                    { width: 24, align: 'right' }
                ],
                [
                    [`Invoice # ${invoiceNo}`, `Date: ${dayjs(receipt.date).format("MM/DD/YYYY HH:mm")}`],
                    [`Cashier: 700013`, `Customer: SYED YASIR`]
                ]
            )
            .newline()
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
            totalItems += (+x.quantity);
            const strArr = new Array<string>();
            strArr.push(x.productName);
            strArr.push(`${x.quantity}`);
            strArr.push(`${numbro(x.price).format({ mantissa: 1 })}`);
            strArr.push('0');
            strArr.push('0');
            strArr.push(`${numbro(x.totalAmount).format({ mantissa: 1 })}`);

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
                    { width: 19, align: 'left' },
                    { width: 29, align: 'left' }
                ],
                [
                    [`Item Sold`, `${totalItems}`],
                    [`No. of Item(s)`, `${receipt.items.length}`]
                ]
            )
            .rule();

        encoder
            .table
            (
                [
                    { width: 30, align: 'right' },
                    { width: 18, align: 'right' }
                ],
                [
                    ['Total Amount: ', receipt.totalAmount],
                    ['Total Discount: ', receipt.totalDiscount],
                    ['Net Total (Receivable): ', receipt.netTotal]
                ]
            )
            .rule();

        encoder
            .align("left")
            .line('Payment Method');

        encoder
            .table
            (
                [
                    { width: 24, align: 'left' },
                    { width: 24, align: 'right' }
                ],
                [
                    ["CASH", `${numbro(receipt.netTotal).formatCurrency({ mantissa: 2, thousandSeparated: true, currencySymbol: 'Rs. ', currencyPosition: "prefix"})}`]
                ]
            )
            .newline()
            .align('center')
            .line('** Thanks for Shopping **');

        const barcode = get13DigitNumber();
        encoder
            .align('center')
            .barcode(`${barcode}`, 'ean13')
            .newline()
            .cut();

        await receiptPrinter.print(encoder.encode());
        await receiptPrinter.disconnect();
    }

    private tableHeader = () => {
        const arr = new Array<any>();
        arr.push({ width: 18, align: 'left' });
        arr.push({ width: 3, align: 'right' });
        arr.push({ width: 7, align: 'right' });
        arr.push({ width: 7, align: 'right' });
        arr.push({ width: 6, align: 'right' });
        arr.push({ width: 7, align: 'right' });
        return arr;
    }

}   