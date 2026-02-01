import { Module } from '@nestjs/common';
import { BasicReportsModule } from './basic-reports/basic-reports.module';
import { ConfigModule } from '@nestjs/config';
import { PrinterModule } from './printer/printer.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), BasicReportsModule, PrinterModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
