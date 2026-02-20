import { TDocumentDefinitions } from 'pdfmake/interfaces';
import { Orders } from 'src/generated/prisma/client';

export const getOrderByIdReportDoc = (order: Orders): TDocumentDefinitions => {
  const docDefinition: TDocumentDefinitions = {
    content: ['Hello World'],
  };

  return docDefinition;
};
