import fs from 'fs';
import { TDocumentDefinitions } from 'pdfmake/interfaces';
import { CHART_COLORS, chartJsToImage, numbers } from 'src/helpers';

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

const generateDonut = async () => {
  const DATA_COUNT = 5;
  const NUMBER_CFG = { count: DATA_COUNT, min: 0, max: 100 };

  const data = {
    labels: ['Red', 'Orange', 'Yellow', 'Green', 'Blue'],
    datasets: [
      {
        label: 'Dataset 1',
        data: numbers(NUMBER_CFG),
        backgroundColor: Object.values(CHART_COLORS),
      },
    ],
  };

  const config = {
    type: 'doughnut',
    data: data,
    options: {
      title: {
        display: true,
        text: 'Chart.js Doughnut Chart',
      },
    },
  };

  const image = await chartJsToImage(config);

  return image;
};

export const getBasicSvgChartReport =
  async (): Promise<TDocumentDefinitions> => {
    const [chart, donut] = await Promise.all([
      generateChartImage(),
      generateDonut(),
    ]);

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
        {
          image: donut,
          width: 500,
        },
      ],
    };
  };
