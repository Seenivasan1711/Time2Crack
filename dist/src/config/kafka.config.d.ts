import { OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Producer, Consumer } from 'kafkajs';
export declare class KafkaConfig implements OnModuleInit, OnModuleDestroy {
    private configService;
    private kafka;
    private producer;
    private consumer;
    private isEnabled;
    constructor(configService: ConfigService);
    onModuleInit(): Promise<void>;
    onModuleDestroy(): Promise<void>;
    getProducer(): Producer | null;
    getConsumer(): Consumer | null;
    publishMessage(topic: string, message: any): Promise<void>;
    subscribeToTopic(topic: string, callback: (message: any) => void): Promise<void>;
}
