import htmlToPdfmake from 'html-to-pdfmake';
import { JSDOM } from 'jsdom';

interface ContentReplacer {
  [key: string]: string;
}

export const getHtmlContent = (
  html: string,
  replacers: ContentReplacer = {},
) => {
  Object.entries(replacers).forEach(([key, value]) => {
    html = html.replaceAll(`{{ ${key} }}`, value);
  });

  const { window } = new JSDOM();
  return htmlToPdfmake(html, { window });
};
