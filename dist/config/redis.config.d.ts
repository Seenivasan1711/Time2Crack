import { ConfigService } from '@nestjs/config';
import { CacheModuleOptions, CacheOptionsFactory } from '@nestjs/cache-manager';
export declare class RedisConfig implements CacheOptionsFactory {
    private configService;
    constructor(configService: ConfigService);
    createCacheOptions(): CacheModuleOptions;
}
