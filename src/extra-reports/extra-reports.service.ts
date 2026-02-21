import { Injectable } from '@nestjs/common';
import { PrinterService } from 'src/printer/printer.service';
import { getHelloWorldReport } from 'src/reports';

@Injectable()
export class ExtraReportsService {
  constructor(private readonly printerService: PrinterService) {}

  async getHtmlReport() {
    const docDefinition = getHelloWorldReport({ name: 'Joaquín Caggiano' });

    const doc = await this.printerService.createPdf(docDefinition);
    return doc;
  }
}
