import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../generated/prisma/client';
import { PrinterService } from 'src/printer/printer.service';
import { getEmploymentLetterReport, getHelloWorldReport } from 'src/reports';

@Injectable()
export class BasicReportsService extends PrismaClient implements OnModuleInit {
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

  async hello() {
    const docDefinition = getHelloWorldReport({ name: 'Joaquín Caggiano' });

    const doc = await this.printerService.createPdf(docDefinition);
    return doc;
  }

  async employmentLetter() {
    const docDefinition = getEmploymentLetterReport();

    const doc = await this.printerService.createPdf(docDefinition);
    return doc;
  }
}
