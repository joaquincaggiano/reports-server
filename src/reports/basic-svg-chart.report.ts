import fs from 'fs';
import { TDocumentDefinitions } from 'pdfmake/interfaces';

const svgContent = fs.readFileSync('src/assets/ford.svg', 'utf8');

export const getBasicSvgChartReport =
  async (): Promise<TDocumentDefinitions> => {
    return {
      content: [
        {
          svg: svgContent,
          width: 150,
        },
      ],
    };
  };
