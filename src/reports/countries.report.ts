import { headerSection } from './sections/header.section';
import { countries as Country } from 'src/generated/prisma/client';
import { footerSection } from './sections/footer.section';
import { TDocumentDefinitions } from 'pdfmake/interfaces';

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
        layout: 'customLayout01', //'lightHorizontalLines', // optional
        table: {
          // headers are automatically repeated if the table spans over multiple pages
          // you can declare how many rows should be treated as headers
          headerRows: 1,
          widths: [50, 50, 50, '*', 'auto', '*'],

          body: [
            [
              { text: 'ID', style: { color: 'white' } },
              { text: 'ISO2', style: { color: 'white' } },
              { text: 'ISO3', style: { color: 'white' } },
              { text: 'Name', style: { color: 'white' } },
              { text: 'Continent', style: { color: 'white' } },
              { text: 'Local Name', style: { color: 'white' } },
            ],
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
      {
        text: 'Totales',
        style: {
          fontSize: 18,
          bold: true,
          margin: [0, 40, 0, 0],
        },
      },
      {
        layout: 'noBorders',
        table: {
          headerRows: 1,
          body: [
            [
              {
                text: 'Total de países',
                bold: true,
              },
              {
                text: countries.length.toString(),
                bold: true,
              },
            ],
          ],
        },
      },
    ],
    footer: (currentPage, pageCount, pageSize) =>
      footerSection({
        currentPage: currentPage ?? 1,
        pageCount: pageCount ?? 1,
        pageSize: pageSize,
      }),
  };
};
