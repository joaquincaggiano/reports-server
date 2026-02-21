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
        image: donut,
        width: 500,
      },
    ],
  };

  return docDefinition;
};
