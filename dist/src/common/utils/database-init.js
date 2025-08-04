"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var DatabaseInitService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseInitService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const config_1 = require("@nestjs/config");
let DatabaseInitService = DatabaseInitService_1 = class DatabaseInitService {
    constructor(dataSource, configService) {
        this.dataSource = dataSource;
        this.configService = configService;
        this.logger = new common_1.Logger(DatabaseInitService_1.name);
    }
    async initializeDatabase() {
        try {
            this.logger.log('Initializing database...');
            await this.runMigrations();
            this.logger.log('Database initialization completed successfully');
        }
        catch (error) {
            this.logger.error(`Database initialization failed: ${error.message}`);
            throw error;
        }
    }
    async runMigrations() {
        try {
            this.logger.log('Running database migrations...');
            const pendingMigrations = await this.dataSource.showMigrations();
            if (pendingMigrations) {
                await this.dataSource.runMigrations();
                this.logger.log('Migrations completed successfully');
            }
            else {
                this.logger.log('No pending migrations');
            }
        }
        catch (error) {
            this.logger.error(`Migration failed: ${error.message}`);
            throw error;
        }
    }
};
exports.DatabaseInitService = DatabaseInitService;
exports.DatabaseInitService = DatabaseInitService = DatabaseInitService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeorm_1.DataSource,
        config_1.ConfigService])
], DatabaseInitService);
//# sourceMappingURL=database-init.js.map