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
  const headerLogo = showLogo ? logo : '';
  
  const headerDate = showDate
    ? ({
        text: DateFormatter.getDDMMMMYYYY(new Date()),
        alignment: 'right',
        margin: [0, 20, 20, 0],
        width: 140,
      } as Content)
    : '';

  const headerSubtitle = subtitle
    ? ({
        text: subtitle,
        alignment: 'center',
        margin: [0, 5, 0, 20],
        fontSize: 16,
        bold: true,
      } as Content)
    : null;

  const headerTitle = title
    ? ({
        stack: [
          {
            text: title,
            bold: true,
            alignment: 'center',
            margin: [0, 20, 0, 0],
            fontSize: 22,
          },
          headerSubtitle,
        ],
      } as Content)
    : '';

  return {
    columns: [headerLogo, headerTitle, headerDate],
  };
};
