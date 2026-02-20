import { join } from 'path';
import {
  Content,
  StyleDictionary,
  TDocumentDefinitions,
} from 'pdfmake/interfaces';
import { CurrencyFormatter, DateFormatter } from 'src/helpers';
import { footerSection } from './sections/footer.section';
import { OrderData } from 'src/interfaces/order.interface';

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

export const getOrderByIdReportDoc = (
  order: OrderData,
): TDocumentDefinitions => {
  const { orderId, orderDate, customers, orderDetails } = order;

  const subtotal = orderDetails.reduce((acc, orderDetail) => {
    return acc + Number(orderDetail.products.price) * orderDetail.quantity;
  }, 0);

  const total = subtotal + subtotal * 0.15;

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
                text: `Recibo No. ${orderId}\n`,
                bold: true,
              },
              `${DateFormatter.getDDMMMMYYYY(orderDate ?? new Date())}`,
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
        text: `Razón social: ${customers.customerName}\n${customers.contactName}\n${customers.address}`,
      },

      // Tabla del detalle de la orden
      {
        layout: 'headerLineOnly',
        margin: [0, 20],
        table: {
          headerRows: 1,
          widths: [50, '*', 'auto', 'auto', 'auto'],
          body: [
            ['ID', 'Descripción', 'Cantidad', 'Precio', 'Total'],
            ...orderDetails.map((orderDetail) => {
              return [
                orderDetail.orderDetailId.toString(),
                orderDetail.products.productName,
                orderDetail.quantity.toString(),
                {
                  text: CurrencyFormatter.format(
                    Number(orderDetail.products.price),
                  ),
                  alignment: 'right' as const,
                },
                {
                  text: CurrencyFormatter.format(
                    Number(orderDetail.products.price) * orderDetail.quantity,
                  ),
                  alignment: 'right' as const,
                },
              ];
            }),
          ],
        },
      },

      // Totales
      {
        columns: [
          {
            width: '*',
            text: '',
          },
          {
            width: 'auto',
            layout: 'noBorders',
            table: {
              body: [
                [
                  'Subtotal',
                  {
                    text: CurrencyFormatter.format(subtotal),
                    alignment: 'right',
                  },
                ],
                [
                  {
                    text: 'Total',
                    bold: true,
                  },
                  {
                    text: CurrencyFormatter.format(total),
                    alignment: 'right',
                    bold: true,
                  },
                ],
              ],
            },
          },
        ],
      },
    ],
  };

  return docDefinition;
};
