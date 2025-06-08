import { Module } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { ReportsController } from './reports.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReportsEntity } from './reports.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ReportsEntity])],
  controllers: [ReportsController],
  providers: [ReportsService],
})
export class ReportsModule {}
