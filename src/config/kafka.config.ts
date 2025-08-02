import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Kafka, Producer, Consumer } from 'kafkajs';
import { logger } from '../common/utils/logger';

@Injectable()
export class KafkaConfig implements OnModuleInit, OnModuleDestroy {
  private kafka: Kafka;
  private producer: Producer;
  private consumer: Consumer;
  private isEnabled: boolean;

  constructor(private configService: ConfigService) {
    this.isEnabled = this.configService.get('KAFKA_ENABLED', 'true') === 'true';
    
    if (this.isEnabled) {
      this.kafka = new Kafka({
        clientId: 'time2crack-backend',
        brokers: [this.configService.get('KAFKA_BROKERS', 'localhost:9092')],
      });
      
      this.producer = this.kafka.producer();
      this.consumer = this.kafka.consumer({ groupId: 'time2crack-group' });
    }
  }

  async onModuleInit() {
    if (!this.isEnabled) {
      logger.info('Kafka is disabled, skipping connection');
      return;
    }

    try {
      await this.producer.connect();
      await this.consumer.connect();
      logger.info('Kafka producer and consumer connected successfully');
    } catch (error) {
      logger.warn('Failed to connect to Kafka, continuing without Kafka:', error.message);
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
      logger.info('Kafka producer and consumer disconnected');
    } catch (error) {
      logger.error('Error disconnecting from Kafka:', error);
    }
  }

  getProducer(): Producer | null {
    return this.isEnabled ? this.producer : null;
  }

  getConsumer(): Consumer | null {
    return this.isEnabled ? this.consumer : null;
  }

  async publishMessage(topic: string, message: any) {
    if (!this.isEnabled || !this.producer) {
      logger.warn('Kafka is disabled, message not published');
      return;
    }

    try {
      await this.producer.send({
        topic,
        messages: [{ value: JSON.stringify(message) }],
      });
      logger.info(`Message published to topic: ${topic}`);
    } catch (error) {
      logger.error(`Failed to publish message to topic ${topic}:`, error);
      throw error;
    }
  }

  async subscribeToTopic(topic: string, callback: (message: any) => void) {
    if (!this.isEnabled || !this.consumer) {
      logger.warn('Kafka is disabled, subscription not created');
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
      logger.info(`Subscribed to topic: ${topic}`);
    } catch (error) {
      logger.error(`Failed to subscribe to topic ${topic}:`, error);
      throw error;
    }
  }
} 