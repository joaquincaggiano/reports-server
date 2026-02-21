import fs from 'fs';
import { TDocumentDefinitions } from 'pdfmake/interfaces';
import { chartJsToImage } from 'src/helpers';

const svgContent = fs.readFileSync('src/assets/ford.svg', 'utf8');

const generateChartImage = async () => {
  const chartConfig = {
    type: 'bar', // Show a bar chart
    data: {
      labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio'], // Set X-axis labels
      datasets: [
        {
          label: 'Mi primer gráfico',
          data: [65, 59, 80, 81, 56, 55, 10],
          backgroundColor: 'rgba(93, 75, 192, 0.2)',
          borderColor: 'rgb(81, 75, 192)',
          borderWidth: 1,
        },
      ],
    },
  };

  const image = await chartJsToImage(chartConfig);

  return image;
};

export const getBasicSvgChartReport =
  async (): Promise<TDocumentDefinitions> => {
    const chart = await generateChartImage();

    return {
      content: [
        {
          svg: svgContent,
          width: 150,
        },
        {
          image: chart,
          width: 500,
        },
      ],
    };
  };
