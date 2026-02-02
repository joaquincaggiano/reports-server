import { Content, ContextPageSize } from 'pdfmake/interfaces';

interface FooterSectionOptions {
  currentPage: number;
  pageCount: number;
  pageSize: ContextPageSize;
}

export const footerSection = (options: FooterSectionOptions): Content => {
  const { currentPage, pageCount, pageSize } = options;

  return {
    text: `${currentPage} de ${pageCount}`,
    alignment: 'right',
    margin: [0, 20, 20, 20],
    fontSize: 10,
    bold: true,
  };
};
