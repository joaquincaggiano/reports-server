import { TDocumentDefinitions } from 'pdfmake/interfaces';
import { getDonutChart } from './charts/donut.chart';

interface TopCountry {
  country: string | null;
  customersCount: number;
}

interface ReportOptions {
  title?: string;
  subtitle?: string;
  topCountries: TopCountry[];
}

export const getStatisticsReport = async (
  options: ReportOptions,
): Promise<TDocumentDefinitions> => {
  const { topCountries } = options;

  const donutEntries = topCountries.map((country) => ({
    label: country.country ?? 'Unknown',
    value: country.customersCount,
  }));

  const donutOptions = {
    entries: donutEntries,
    //title: 'Top Countries',
    dataSetLabel: 'Customers Count',
    position: 'left' as const,
  };

  const donut = await getDonutChart(donutOptions);

  const docDefinition: TDocumentDefinitions = {
    content: [
      {
        columns: [
          {
            stack: [
              {
                text: 'Top Countries',
                alignment: 'center',
                bold: true,
                fontSize: 14,
                margin: [0, 0, 0, 20],
              },
              {
                image: donut,
                width: 350,
              },
            ],
          },
          {
            layout: 'lightHorizontalLines',
            width: 'auto',
            table: {
              headerRows: 1,
              widths: [100, '*'],
              body: [
                ['País', 'Clientes'],
                ...topCountries.map((country) => [
                  country.country ?? 'Unknown',
                  country.customersCount.toString(),
                ]),
              ],
            },
          },
        ],
      },
    ],
  };

  return docDefinition;
};
