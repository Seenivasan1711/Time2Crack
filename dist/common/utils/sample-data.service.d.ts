import { DataSource } from 'typeorm';
export declare class SampleDataService {
    private dataSource;
    private readonly logger;
    constructor(dataSource: DataSource);
    populateSampleData(): Promise<void>;
}
