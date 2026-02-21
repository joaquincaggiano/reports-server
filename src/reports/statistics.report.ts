import { TDocumentDefinitions } from 'pdfmake/interfaces';
import { getDonutChart } from './charts/donut.chart';
import { headerSection } from './sections/header.section';
import { getLineChart } from './charts/line.chart';
import { getBarsChart } from './charts/bars.chart';
import { footerSection } from './sections/footer.section';

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
  const {
    topCountries,
    title = 'Statistics Report',
    subtitle = 'Top Countries',
  } = options;

  const entries = topCountries.map((country) => ({
    label: country.country ?? 'Unknown',
    value: country.customersCount,
  }));

  const donutOptions = {
    entries,
    //title: 'Top Countries',
    dataSetLabel: 'Customers Count',
    position: 'left' as const,
  };

  const [donut, line, bars] = await Promise.all([
    getDonutChart(donutOptions),
    getLineChart({
      entries,
      dataSetLabel: 'Customers Count',
    }),
    getBarsChart(),
  ]);

  const docDefinition: TDocumentDefinitions = {
    pageMargins: [40, 120, 40, 60],
    header: headerSection({
      title,
      subtitle,
    }),
    footer: (currentPage, pageCount, pageSize) =>
      footerSection({
        currentPage: currentPage ?? 1,
        pageCount: pageCount ?? 1,
        pageSize: pageSize,
      }),
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
      {
        image: line,
        width: 500,
        margin: [0, 20],
      },
      {
        image: bars,
        width: 500,
      },
    ],
  };

  return docDefinition;
};
