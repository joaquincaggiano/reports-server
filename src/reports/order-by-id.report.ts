import { join } from 'path';
import {
  Content,
  StyleDictionary,
  TDocumentDefinitions,
} from 'pdfmake/interfaces';
import { Orders } from 'src/generated/prisma/client';
import { DateFormatter } from 'src/helpers';
import { footerSection } from './sections/footer.section';

const logo: Content = {
  image: join(process.cwd(), 'src', 'assets', 'tucan-banner.png'),
  width: 100,
  height: 30,
  margin: [20, 20, 0, 20],
};

const styles: StyleDictionary = {
  header: {
    fontSize: 16,
    bold: true,
    margin: [0, 20, 0, 10],
  },
  subHeader: {
    fontSize: 14,
    bold: true,
    margin: [0, 0, 0, 10],
  },
};

export const getOrderByIdReportDoc = (order: Orders): TDocumentDefinitions => {
  const docDefinition: TDocumentDefinitions = {
    styles,
    header: logo,
    footer: (currentPage, pageCount, pageSize) =>
      footerSection({
        currentPage: currentPage ?? 1,
        pageCount: pageCount ?? 1,
        pageSize: pageSize,
      }),
    pageMargins: [40, 60, 40, 60],
    content: [
      // Header
      {
        text: 'Tucan Code',
        style: 'header',
      },
      // Address y order data
      {
        columns: [
          {
            text: 'Campoamor 45\nValencia, España\n46022\nhttps://moilab.es',
            alignment: 'left',
          },
          {
            text: [
              {
                text: `Recibo No. ${order.orderId}\n`,
                bold: true,
              },
              `${DateFormatter.getDDMMMMYYYY(order.orderDate ?? new Date())}\nPagar antes de: ${DateFormatter.getDDMMMMYYYY(new Date())}`,
            ],
            alignment: 'right',
          },
        ],
      },
      // QR
      {
        qr: 'https://moilab.es',
        fit: 100,
        alignment: 'right',
        margin: [0, 20, 0, 20],
      },
      // Dirección del cliente
      {
        text: 'Cobrar a:\n',
        style: 'subHeader',
      },
      {
        text: `Razón social: Richer Supermarket\nMichael Holz\nGrenzacherweg 237`,
      },
    ],
  };

  return docDefinition;
};
