declare module '@point-of-sale/receipt-printer-encoder' {
    type BarcodeType = 'ean13' | 'ean8' | 'upca' | 'code39' | 'codabar' | 'code93' | 'code128' | 'itf';
    
    interface ReceiptPrinterEncoderOptions {
        language: 'escpos' | 'star-prnt';
    }

    export interface  ReceiptPrinterEncoder {
        language: 'escpos' | 'star-prnt';
        newline: () => void;
        line: (text: string) => void;
        text(text: string): this;
        size(size: 'normal' | 'small'): this;
        width(width: number): this;
        height(height: number): this;
        barcode(data: string, type: BarcodeType, height: number): this;
        qrcode(data: string): this;
        cut(): this;
        encode(): Uint8Array;
    }
};

declare module '@point-of-sale/system-receipt-printer' {
    interface SystemReceiptPrinterOptions {
        name: string;
    }

    class SystemReceiptPrinter {
        constructor(options: SystemReceiptPrinterOptions);
        addEventListener(event: 'connected' | 'disconnected', callback: () => void): void;
        connect(): Promise<void>;
        disconnect(): Promise<void>;
        print(data: Uint8Array): Promise<void>;
    }

    export default SystemReceiptPrinter;

};