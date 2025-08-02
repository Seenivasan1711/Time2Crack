"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseInitModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const config_1 = require("@nestjs/config");
const database_init_1 = require("./database-init");
let DatabaseInitModule = class DatabaseInitModule {
};
exports.DatabaseInitModule = DatabaseInitModule;
exports.DatabaseInitModule = DatabaseInitModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forRootAsync({
                useFactory: () => ({
                    type: 'postgres',
                    host: process.env.DB_HOST || 'localhost',
                    port: parseInt(process.env.DB_PORT || '5432'),
                    username: process.env.DB_USER || 'postgres',
                    password: process.env.DB_PASSWORD || 'postgres',
                    database: process.env.DB_NAME || 'time2crack',
                    entities: [__dirname + '/../../**/*.entity{.ts,.js}'],
                    migrations: [__dirname + '/../../migrations/*{.ts,.js}'],
                    synchronize: false,
                    logging: process.env.NODE_ENV === 'development',
                }),
            }),
            config_1.ConfigModule,
        ],
        providers: [database_init_1.DatabaseInitService],
        exports: [database_init_1.DatabaseInitService],
    })
], DatabaseInitModule);
//# sourceMappingURL=database-init.module.js.map