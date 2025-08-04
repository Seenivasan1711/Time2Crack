import { Module, OnModuleInit } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CacheModule } from '@nestjs/cache-manager';
import { ThrottlerModule } from '@nestjs/throttler';
import { TerminusModule } from '@nestjs/terminus';
import { ScheduleModule } from '@nestjs/schedule';

// Modules
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { ProductsModule } from './modules/products/products.module';
import { CategoriesModule } from './modules/categories/categories.module';
import { CartModule } from './modules/cart/cart.module';
import { OrdersModule } from './modules/orders/orders.module';
import { AssistantModule } from './modules/assistant/assistant.module';
import { HealthModule } from './modules/health/health.module';

// Configuration
import { DatabaseConfig } from './config/database.config';
import { RedisConfig } from './config/redis.config';
import { KafkaConfig } from './config/kafka.config';
import { DatabaseInitService } from './common/utils/database-init';
import { SampleDataService } from './common/utils/sample-data.service';

@Module({
  imports: [
    // Configuration
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    
    // Database
    TypeOrmModule.forRootAsync({
      useClass: DatabaseConfig,
    }),
    
    // Cache
    CacheModule.registerAsync({
      useClass: RedisConfig,
      isGlobal: true,
    }),
    
    // Rate limiting
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 100,
      },
    ]),
    
    // Scheduling
    ScheduleModule.forRoot(),
    
    // Health checks
    TerminusModule,
    
    // Feature modules
    AuthModule,
    UsersModule,
    ProductsModule,
    CategoriesModule,
    CartModule,
    OrdersModule,
    AssistantModule,
    HealthModule,
  ],
  providers: [KafkaConfig, DatabaseInitService, SampleDataService],
})
export class AppModule implements OnModuleInit {
  constructor(
    private readonly databaseInitService: DatabaseInitService,
    private readonly sampleDataService: SampleDataService,
  ) {}

  async onModuleInit() {
    // Initialize database on application startup
    await this.databaseInitService.initializeDatabase();
    
    // Populate sample data
    await this.sampleDataService.populateSampleData();
  }
} 