import { join } from 'path';
import { Content } from 'pdfmake/interfaces';
import { DateFormatter } from 'src/helpers';

interface HeaderSectionOptions {
  title?: string;
  subtitle?: string;
  showLogo?: boolean;
  showDate?: boolean;
}

const logo: Content = {
  image: join(process.cwd(), 'src', 'assets', 'tucan-code-logo.png'),
  width: 100,
  height: 100,
  alignment: 'center',
  margin: [0, 0, 0, 20],
};

export const headerSection = ({
  title,
  subtitle,
  showLogo = true,
  showDate = true,
}: HeaderSectionOptions): Content => {
  const headerLogo: Content = showLogo ? logo : '';
  const headerDate: Content = showDate
    ? {
        text: DateFormatter.getDDMMMMYYYY(new Date()),
        alignment: 'right',
        margin: [0, 20, 20, 0],
      }
    : '';
  const headerTitle: Content = title
    ? {
        text: title,
        bold: true,
        alignment: 'center',
        margin: [0, 20, 20, 0],
      }
    : '';

  return {
    columns: [headerLogo, headerTitle, headerDate],
  };
};
