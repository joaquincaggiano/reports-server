import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../generated/prisma/client';
import { join } from 'node:path';
import PdfPrinter from 'pdfmake/js/Printer';
import { TDocumentDefinitions } from 'pdfmake/interfaces';

const fonts = {
  Roboto: {
    normal: join(process.cwd(), 'fonts', 'Roboto-Regular.ttf'),
    bold: join(process.cwd(), 'fonts', 'Roboto-Medium.ttf'),
    italics: join(process.cwd(), 'fonts', 'Roboto-Italic.ttf'),
    bolditalics: join(process.cwd(), 'fonts', 'Roboto-MediumItalic.ttf'),
  },
};

@Injectable()
export class BasicReportsService extends PrismaClient implements OnModuleInit {
  constructor() {
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
    const printer = new PdfPrinter(fonts);

    const docDefinition: TDocumentDefinitions = {
      content: ['Hello World'],
    };

    const doc = await printer.createPdfKitDocument(docDefinition);
    return doc;
  }
}
