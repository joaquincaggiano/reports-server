import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../generated/prisma/client';
import { PrinterService } from 'src/printer/printer.service';
import {
  getEmploymentLetterReport,
  getEmploymentLetterByIdReport,
  getHelloWorldReport,
  getCountriesReport,
} from 'src/reports';

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

  async employmentLetterById(id: number) {
    const employee = await this.employee.findUnique({
      where: { id },
    });

    if (!employee) {
      throw new NotFoundException('Employee not found');
    }

    const docDefinition = getEmploymentLetterByIdReport({
      employerName: 'Joaquín Caggiano',
      employerPosition: 'Software Engineer',
      employeeName: employee.name,
      employeePosition: employee.position,
      employeeStartDate: employee.startDate,
      employeeHours: employee.hoursPerDay,
      employeeWorkSchedule: employee.workSchedule,
      employerCompany: 'Tucan Code Corp.',
    });

    const doc = await this.printerService.createPdf(docDefinition);
    return doc;
  }

  async getCountries() {
    const countries = await this.countries.findMany({
      where: {
        localName: {
          not: null,
        },
      },
    });

    const docDefinition = getCountriesReport({ countries });

    const doc = await this.printerService.createPdf(docDefinition);
    return doc;
  }
}
