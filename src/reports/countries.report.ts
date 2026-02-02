import { TDocumentDefinitions } from 'pdfmake/interfaces';
import { headerSection } from './sections/header.section';
import { countries as Country } from 'src/generated/prisma/client';

interface CountriesReportOptions {
  title?: string;
  subtitle?: string;
  countries: Country[];
}

export const getCountriesReport = (
  options: CountriesReportOptions,
): TDocumentDefinitions => {
  const {
    title = 'Countries Report',
    subtitle = 'List of countries',
    countries,
  } = options;

  const toCellText = (value: unknown): string =>
    value === null || value === undefined ? '' : String(value);

  return {
    pageOrientation: 'landscape',
    header: headerSection({
      title,
      subtitle,
    }),
    pageMargins: [40, 120, 40, 60],
    content: [
      {
        layout: 'lightHorizontalLines', // optional
        table: {
          // headers are automatically repeated if the table spans over multiple pages
          // you can declare how many rows should be treated as headers
          headerRows: 1,
          widths: [50, 50, 50, '*', 'auto', '*'],

          body: [
            ['ID', 'ISO2', 'ISO3', 'Name', 'Continent', 'Local Name'],
            ...countries.map((country) => [
              country.id.toString(),
              country.iso2,
              toCellText(country.iso3),
              { text: toCellText(country.name), bold: true },
              toCellText(country.continent),
              toCellText(country.localName),
            ]),
          ],
        },
      },
    ],
  };
};
