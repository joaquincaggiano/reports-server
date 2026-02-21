import { Controller, Get, Res } from '@nestjs/common';
import { ExtraReportsService } from './extra-reports.service';
import type { Response } from 'express';

@Controller('extra-reports')
export class ExtraReportsController {
  constructor(private readonly extraReportsService: ExtraReportsService) {}

  @Get('html-report')
  async getHtmlReport(@Res() res: Response) {
    const pdfDoc = await this.extraReportsService.getHtmlReport();

    res.setHeader('Content-Type', 'application/pdf');
    pdfDoc.info.title = 'Hello World';
    pdfDoc.pipe(res);
    pdfDoc.end();
  }
}
