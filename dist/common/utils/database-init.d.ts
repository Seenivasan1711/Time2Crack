import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
export declare class DatabaseInitService {
    private dataSource;
    private configService;
    private readonly logger;
    constructor(dataSource: DataSource, configService: ConfigService);
    initializeDatabase(): Promise<void>;
    private runMigrations;
}
