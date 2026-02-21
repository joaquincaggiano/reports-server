import type { TDocumentDefinitions } from 'pdfmake/interfaces';

export const getCommunityReport = (): TDocumentDefinitions => {
  const docDefinition: TDocumentDefinitions = {
    defaultStyle: {
      fontSize: 10,
    },
    content: [
      // Header
      {
        columns: [
          {
            image: 'src/assets/tucan-code-logo.png',
            width: 50,
          },
          {
            text: 'Forest Admin Community SAP\nRUT: 44.123.1243\nCamino montaña km 45\nTeléfono: +56 9 1234 5678',
            alignment: 'center',
          },
          {
            alignment: 'right',
            width: 'auto',
            layout: 'borderBlue',
            table: {
              body: [
                [
                  {
                    layout: 'noBorders',
                    table: {
                      body: [
                        ['No.', '123-456'],
                        ['Fecha', '21/10/1997'],
                        ['Versión', '2026-001'],
                      ],
                    },
                  },
                ],
              ],
            },
          },
        ],
      },
      // Horizontal line
      {
        margin: [0, 10],
        canvas: [
          {
            type: 'line',
            x1: 0,
            y1: 5,
            x2: 515,
            y2: 5,
            lineWidth: 2,
            lineColor: '#3A4546',
          },
        ],
      },
    ],
  };

  return docDefinition;
};
