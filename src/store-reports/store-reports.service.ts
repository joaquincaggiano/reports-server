import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from 'src/generated/prisma/client';
import { PrinterService } from 'src/printer/printer.service';
import { getOrderByIdReportDoc } from 'src/reports';

@Injectable()
export class StoreReportsService extends PrismaClient implements OnModuleInit {
  constructor(private readonly printerService: PrinterService) {
    const adapter = new PrismaPg({
      connectionString: process.env.DATABASE_URL as string,
    });
    super({ adapter });
  }

  async onModuleInit() {
    await this.$connect();
    console.log('Connected to the database');
  }

  async getOrderByIdReport(id: number) {
    const order = await this.orders.findUnique({ where: { orderId: id } });

    if (!order) {
      throw new NotFoundException('Order not found');
    }

    const docDefinition = getOrderByIdReportDoc(order);

    const doc = await this.printerService.createPdf(docDefinition);
    return doc;
  }
}
