import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Kafka, Producer, Consumer } from 'kafkajs';
import { logger } from '../common/utils/logger';

@Injectable()
export class KafkaConfig implements OnModuleInit, OnModuleDestroy {
  private kafka: Kafka;
  private producer: Producer;
  private consumer: Consumer;

  constructor(private configService: ConfigService) {
    this.kafka = new Kafka({
      clientId: 'ai-ecommerce-backend',
      brokers: [this.configService.get('KAFKA_BROKERS', 'localhost:9092')],
    });
    
    this.producer = this.kafka.producer();
    this.consumer = this.kafka.consumer({ groupId: 'ai-ecommerce-group' });
  }

  async onModuleInit() {
    try {
      await this.producer.connect();
      await this.consumer.connect();
      logger.info('Kafka producer and consumer connected successfully');
    } catch (error) {
      logger.error('Failed to connect to Kafka:', error);
    }
  }

  async onModuleDestroy() {
    try {
      await this.producer.disconnect();
      await this.consumer.disconnect();
      logger.info('Kafka producer and consumer disconnected');
    } catch (error) {
      logger.error('Error disconnecting from Kafka:', error);
    }
  }

  getProducer(): Producer {
    return this.producer;
  }

  getConsumer(): Consumer {
    return this.consumer;
  }

  async publishMessage(topic: string, message: any) {
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