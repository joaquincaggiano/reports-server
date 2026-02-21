import { TDocumentDefinitions } from 'pdfmake/interfaces';
import { chartJsToImage } from 'src/helpers';

interface TopCountry {
  country: string | null;
  customersCount: number;
}

interface ReportOptions {
  title?: string;
  subtitle?: string;
  topCountries: TopCountry[];
}

const generateTopCountryDonut = async (
  topCountries: TopCountry[],
): Promise<string> => {
  const data = {
    labels: topCountries.map((country) => country.country ?? 'Unknown'),
    datasets: [
      {
        label: 'Customers Count',
        data: topCountries.map((country) => country.customersCount),
      },
    ],
  };

  const config = {
    type: 'doughnut',
    data: data,
    options: {
      legend: {
        position: 'left',
      },
      plugins: {
        datalabels: {
          color: 'white',
          font: {
            bold: true,
            size: 14,
          },
        },
      },
      title: {
        display: true,
        text: 'Top Countries',
      },
    },
  };

  const image = await chartJsToImage(config);
  return image;
};

export const getStatisticsReport = async (
  options: ReportOptions,
): Promise<TDocumentDefinitions> => {
  const donut = await generateTopCountryDonut(options.topCountries);

  const docDefinition: TDocumentDefinitions = {
    content: [
      {
        image: donut,
        width: 500,
      },
    ],
  };

  return docDefinition;
};
