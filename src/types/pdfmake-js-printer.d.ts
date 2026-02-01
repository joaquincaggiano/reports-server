declare module 'pdfmake/js/Printer' {
  import type { TDocumentDefinition } from 'pdfmake';

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
      options?: Record<string, unknown>,
    ): Promise<PdfKitDocument>;
  }
}

