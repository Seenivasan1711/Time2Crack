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
Object.defineProperty(exports, "__esModule", { value: true });
exports.KafkaConfig = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const kafkajs_1 = require("kafkajs");
const logger_1 = require("../common/utils/logger");
let KafkaConfig = class KafkaConfig {
    constructor(configService) {
        this.configService = configService;
        this.isEnabled = this.configService.get('KAFKA_ENABLED', 'true') === 'true';
        if (this.isEnabled) {
            this.kafka = new kafkajs_1.Kafka({
                clientId: 'time2crack-backend',
                brokers: [this.configService.get('KAFKA_BROKERS', 'localhost:9092')],
            });
            this.producer = this.kafka.producer();
            this.consumer = this.kafka.consumer({ groupId: 'time2crack-group' });
        }
    }
    async onModuleInit() {
        if (!this.isEnabled) {
            logger_1.logger.info('Kafka is disabled, skipping connection');
            return;
        }
        try {
            await this.producer.connect();
            await this.consumer.connect();
            logger_1.logger.info('Kafka producer and consumer connected successfully');
        }
        catch (error) {
            logger_1.logger.warn('Failed to connect to Kafka, continuing without Kafka:', error.message);
            this.isEnabled = false;
        }
    }
    async onModuleDestroy() {
        if (!this.isEnabled || !this.producer || !this.consumer) {
            return;
        }
        try {
            await this.producer.disconnect();
            await this.consumer.disconnect();
            logger_1.logger.info('Kafka producer and consumer disconnected');
        }
        catch (error) {
            logger_1.logger.error('Error disconnecting from Kafka:', error);
        }
    }
    getProducer() {
        return this.isEnabled ? this.producer : null;
    }
    getConsumer() {
        return this.isEnabled ? this.consumer : null;
    }
    async publishMessage(topic, message) {
        if (!this.isEnabled || !this.producer) {
            logger_1.logger.warn('Kafka is disabled, message not published');
            return;
        }
        try {
            await this.producer.send({
                topic,
                messages: [{ value: JSON.stringify(message) }],
            });
            logger_1.logger.info(`Message published to topic: ${topic}`);
        }
        catch (error) {
            logger_1.logger.error(`Failed to publish message to topic ${topic}:`, error);
            throw error;
        }
    }
    async subscribeToTopic(topic, callback) {
        if (!this.isEnabled || !this.consumer) {
            logger_1.logger.warn('Kafka is disabled, subscription not created');
            return;
        }
        try {
            await this.consumer.subscribe({ topic, fromBeginning: true });
            await this.consumer.run({
                eachMessage: async ({ topic, partition, message }) => {
                    const value = JSON.parse(message.value.toString());
                    callback(value);
                },
            });
            logger_1.logger.info(`Subscribed to topic: ${topic}`);
        }
        catch (error) {
            logger_1.logger.error(`Failed to subscribe to topic ${topic}:`, error);
            throw error;
        }
    }
};
exports.KafkaConfig = KafkaConfig;
exports.KafkaConfig = KafkaConfig = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], KafkaConfig);
//# sourceMappingURL=kafka.config.js.map