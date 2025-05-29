import { Kafka } from 'kafkajs';
import { logger } from '../utils/logger.js';

// Create Kafka client
const kafka = new Kafka({
  clientId: 'ecommerce-app',
  brokers: (process.env.KAFKA_BROKERS || 'localhost:9092').split(','),
  retry: {
    initialRetryTime: 300,
    retries: 10
  }
});

// Create producer
const producer = kafka.producer();

// Create consumer
const consumer = kafka.consumer({ groupId: 'delivery-group' });

export const initKafka = async () => {
  try {
    // Connect producer
    await producer.connect();
    logger.info('Kafka producer connected');
    
    // Connect consumer
    await consumer.connect();
    logger.info('Kafka consumer connected');
    
    // Subscribe to topics
    await consumer.subscribe({ topic: 'scheduled_deliveries', fromBeginning: true });
    
    // Run consumer
    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        try {
          const deliveryData = JSON.parse(message.value.toString());
          logger.info(`Processing delivery for order: ${deliveryData.orderId}`);
          
          // Simulate delivery processing
          await processDelivery(deliveryData);
        } catch (error) {
          logger.error(`Error processing delivery message: ${error.message}`);
        }
      }
    });
  } catch (error) {
    logger.error(`Kafka initialization failed: ${error.message}`);
    throw error;
  }
};

// Process delivery (simulation)
const processDelivery = async (deliveryData) => {
  logger.info(`Simulating delivery for order ${deliveryData.orderId}`);
  logger.info(`Delivery scheduled for: ${deliveryData.deliveryDate}`);
  logger.info(`Delivery details: ${JSON.stringify(deliveryData)}`);
  
  // In a real application, this would update the order status, send notifications, etc.
};

// Send message to Kafka
export const sendToKafka = async (topic, message) => {
  try {
    await producer.send({
      topic,
      messages: [
        { value: JSON.stringify(message) }
      ]
    });
    logger.info(`Message sent to topic ${topic}`);
    return true;
  } catch (error) {
    logger.error(`Failed to send message to Kafka: ${error.message}`);
    return false;
  }
};

export default { producer, consumer };