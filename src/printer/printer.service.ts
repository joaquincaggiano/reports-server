import { Injectable } from '@nestjs/common';
import { join } from 'node:path';
import { TDocumentDefinitions } from 'pdfmake/interfaces';
import PdfPrinter, { PdfKitDocument } from 'pdfmake/js/Printer';

const fonts = {
  Roboto: {
    normal: join(process.cwd(), 'fonts', 'Roboto-Regular.ttf'),
    bold: join(process.cwd(), 'fonts', 'Roboto-Medium.ttf'),
    italics: join(process.cwd(), 'fonts', 'Roboto-Italic.ttf'),
    bolditalics: join(process.cwd(), 'fonts', 'Roboto-MediumItalic.ttf'),
  },
};

@Injectable()
export class PrinterService {
  private printer = new PdfPrinter(fonts);

  async createPdf(
    docDefinition: TDocumentDefinitions,
    options: Record<string, unknown> = {},
  ): Promise<PdfKitDocument> {
    const pdfDoc = await this.printer.createPdfKitDocument(
      docDefinition,
      options,
    );

    return pdfDoc;
  }
}
