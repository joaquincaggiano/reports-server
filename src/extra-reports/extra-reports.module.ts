import { Module } from '@nestjs/common';
import { ExtraReportsService } from './extra-reports.service';
import { ExtraReportsController } from './extra-reports.controller';
import { PrinterModule } from 'src/printer/printer.module';

@Module({
  imports: [PrinterModule],
  controllers: [ExtraReportsController],
  providers: [ExtraReportsService],
})
export class ExtraReportsModule {}
