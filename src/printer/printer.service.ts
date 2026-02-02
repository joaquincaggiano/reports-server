import { Injectable } from '@nestjs/common';
import { join } from 'node:path';
import {
  BufferOptions,
  CustomTableLayout,
  TDocumentDefinitions,
} from 'pdfmake/interfaces';
import PdfPrinter, { PdfKitDocument } from 'pdfmake/js/Printer';

type CreatePdfOptions = BufferOptions & {
  tableLayouts?: Record<string, CustomTableLayout>;
};

const fonts = {
  Roboto: {
    normal: join(process.cwd(), 'fonts', 'Roboto-Regular.ttf'),
    bold: join(process.cwd(), 'fonts', 'Roboto-Medium.ttf'),
    italics: join(process.cwd(), 'fonts', 'Roboto-Italic.ttf'),
    bolditalics: join(process.cwd(), 'fonts', 'Roboto-MediumItalic.ttf'),
  },
};

const customTableLayouts: Record<string, CustomTableLayout> = {
  customLayout01: {
    hLineWidth: function (i, node) {
      if (i === 0 || i === node.table.body.length) {
        return 0;
      }
      return i === node.table.headerRows ? 2 : 1;
    },
    vLineWidth: function (i) {
      return 0;
    },
    hLineColor: function (i) {
      return i === 1 ? 'black' : '#aaa';
    },
    paddingLeft: function (i) {
      return i === 0 ? 0 : 8;
    },
    paddingRight: function (i, node) {
      return i === (node.table.widths?.length ?? 0) - 1 ? 0 : 8;
    },
    fillColor: function (i, node) {
      if (i === 0) return '#7b90be';
      return i % 2 === 0 ? '#f3f3f3' : '#ffffff';
    },
  },
};

@Injectable()
export class PrinterService {
  private printer = new PdfPrinter(fonts);

  async createPdf(
    docDefinition: TDocumentDefinitions,
    options: CreatePdfOptions = {
      tableLayouts: customTableLayouts,
    },
  ): Promise<PdfKitDocument> {
    const pdfDoc = await this.printer.createPdfKitDocument(
      docDefinition,
      options,
    );

    return pdfDoc;
  }
}
