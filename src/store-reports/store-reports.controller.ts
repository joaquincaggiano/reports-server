import { Controller, Get, Param, Res } from '@nestjs/common';
import { StoreReportsService } from './store-reports.service';
import type { Response } from 'express';

@Controller('store-reports')
export class StoreReportsController {
  constructor(private readonly storeReportsService: StoreReportsService) {}

  @Get('orders/:id')
  async getOrderReport(@Param('id') id: string, @Res() res: Response) {
    const pdfDoc = await this.storeReportsService.getOrderByIdReport(
      Number(id),
    );

    res.setHeader('Content-Type', 'application/pdf');
    pdfDoc.info.Title = `Order - ${id}`;
    pdfDoc.pipe(res);
    pdfDoc.end();
  }

  @Get('svg-charts')
  async getSvgCharts(@Res() res: Response) {
    const pdfDoc = await this.storeReportsService.getSvgCharts();

    res.setHeader('Content-Type', 'application/pdf');
    pdfDoc.info.Title = `Svgs Charts`;
    pdfDoc.pipe(res);
    pdfDoc.end();
  }
}
