import { Injectable, Logger } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { seedData } from '../../database/seeds/seed-data';

@Injectable()
export class SampleDataService {
  private readonly logger = new Logger(SampleDataService.name);

  constructor(private dataSource: DataSource) {}

  async populateSampleData(): Promise<void> {
    try {
      this.logger.log('Populating sample data...');
      
      // Use the comprehensive seed data
      await seedData(this.dataSource);
      
      this.logger.log('Sample data populated successfully');
    } catch (error) {
      this.logger.error(`Failed to populate sample data: ${error.message}`);
    }
  }
} 