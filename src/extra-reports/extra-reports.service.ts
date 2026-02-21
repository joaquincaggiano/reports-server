import fs from 'fs';
import { Injectable } from '@nestjs/common';
import { PrinterService } from 'src/printer/printer.service';
import { getHtmlContent } from 'src/helpers/html-to-pdfmake';
import { TDocumentDefinitions } from 'pdfmake/interfaces';
import { headerSection } from 'src/reports/sections/header.section';
import { footerSection } from 'src/reports/sections/footer.section';
import { getCommunityReport } from 'src/reports';

@Injectable()
export class ExtraReportsService {
  constructor(private readonly printerService: PrinterService) {}

  async getHtmlReport() {
    const html = fs.readFileSync('src/reports/html/basic-02.html', 'utf8');
    const content = getHtmlContent(html, {
      client: 'Joaquín Caggiano',
    });

    const docDefinition: TDocumentDefinitions = {
      pageMargins: [40, 100, 40, 60],
      header: headerSection({ title: 'HTML to PDFMake' }),
      footer: (currentPage, pageCount, pageSize) =>
        footerSection({
          currentPage: currentPage ?? 1,
          pageCount: pageCount ?? 1,
          pageSize: pageSize,
        }),
      content,
    };

    const doc = await this.printerService.createPdf(docDefinition);
    return doc;
  }

  async getCommunity() {
    const docDefinition = getCommunityReport();

    const doc = await this.printerService.createPdf(docDefinition);
    return doc;
  }
}
