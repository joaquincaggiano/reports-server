import { Controller, Get, Param, Res } from '@nestjs/common';
import { BasicReportsService } from './basic-reports.service';
import type { Response } from 'express';

@Controller('basic-reports')
export class BasicReportsController {
  constructor(private readonly basicReportsService: BasicReportsService) {}

  @Get()
  async hello(@Res() res: Response) {
    const pdfDoc = await this.basicReportsService.hello();

    res.setHeader('Content-Type', 'application/pdf');
    pdfDoc.info.title = 'Hello World';
    pdfDoc.pipe(res);
    pdfDoc.end();
  }

  @Get('employment-letter')
  async employmentLetter(@Res() res: Response) {
    const pdfDoc = await this.basicReportsService.employmentLetter();

    res.setHeader('Content-Type', 'application/pdf');
    pdfDoc.info.Title = 'Employment Letter';
    pdfDoc.pipe(res);
    pdfDoc.end();
  }

  @Get('employment-letter/:id')
  async employmentLetterById(@Param('id') id: string, @Res() res: Response) {
    const pdfDoc = await this.basicReportsService.employmentLetterById(
      Number(id),
    );

    res.setHeader('Content-Type', 'application/pdf');
    pdfDoc.info.Title = `Employment Letter - ${id}`;
    pdfDoc.pipe(res);
    pdfDoc.end();
  }

  @Get('countries')
  async getCountries(@Res() res: Response) {
    const pdfDoc = await this.basicReportsService.getCountries();

    res.setHeader('Content-Type', 'application/pdf');
    pdfDoc.info.Title = 'Countries-Report';
    pdfDoc.pipe(res);
    pdfDoc.end();
  }
}
