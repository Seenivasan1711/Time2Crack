import { OnModuleInit } from '@nestjs/common';
import { DatabaseInitService } from './common/utils/database-init';
import { SampleDataService } from './common/utils/sample-data.service';
export declare class AppModule implements OnModuleInit {
    private readonly databaseInitService;
    private readonly sampleDataService;
    constructor(databaseInitService: DatabaseInitService, sampleDataService: SampleDataService);
    onModuleInit(): Promise<void>;
}
