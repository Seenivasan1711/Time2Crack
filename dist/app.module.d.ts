import { OnModuleInit } from '@nestjs/common';
import { DatabaseInitService } from './common/utils/database-init';
export declare class AppModule implements OnModuleInit {
    private readonly databaseInitService;
    constructor(databaseInitService: DatabaseInitService);
    onModuleInit(): Promise<void>;
}
