declare module 'pdfmake/js/Printer' {
  import type { BufferOptions, DocumentDefinition } from 'pdfmake';

  type PdfKitDocument = NodeJS.ReadableStream & {
    info: Record<string, unknown>;
    end: () => void;
  };

  export default class PdfPrinter {
    constructor(
      fontDescriptors: Record<string, unknown>,
      virtualfs?: unknown,
      urlResolver?: unknown,
    );

    createPdfKitDocument(
      docDefinition: TDocumentDefinition,
      options?: BufferOptions,
    ): Promise<PdfKitDocument>;
  }
}
