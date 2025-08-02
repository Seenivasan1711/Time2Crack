import { Injectable, Logger } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class DatabaseInitService {
  private readonly logger = new Logger(DatabaseInitService.name);

  constructor(
    private dataSource: DataSource,
    private configService: ConfigService,
  ) {}

  async initializeDatabase(): Promise<void> {
    try {
      this.logger.log('Initializing database...');

      // Run migrations (database connection is already established)
      await this.runMigrations();

      this.logger.log('Database initialization completed successfully');
    } catch (error) {
      this.logger.error(`Database initialization failed: ${error.message}`);
      throw error;
    }
  }

  private async runMigrations(): Promise<void> {
    try {
      this.logger.log('Running database migrations...');
      
      const pendingMigrations = await this.dataSource.showMigrations();
      if (pendingMigrations) {
        await this.dataSource.runMigrations();
        this.logger.log('Migrations completed successfully');
      } else {
        this.logger.log('No pending migrations');
      }
    } catch (error) {
      this.logger.error(`Migration failed: ${error.message}`);
      throw error;
    }
  }
} 