# AI/ML Architecture with Python and Message Queues

## Overview

This document outlines the recommended architecture for integrating AI/ML capabilities into the Time2Crack e-commerce platform using Python services with message queue communication.

## Why Python + Message Queues for AI/ML?

### Advantages:
1. **Native AI/ML Processing** - Direct access to TensorFlow, PyTorch, scikit-learn
2. **Asynchronous Processing** - Handle heavy ML workloads without blocking
3. **Scalability** - Scale AI services independently
4. **Fault Tolerance** - Message queues provide reliability and retry mechanisms
5. **Flexibility** - Easy to add new AI models/services

## Recommended Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Node.js API   │───▶│  Message Queue  │───▶│  Python AI/ML   │
│   (Express)     │    │   (Redis/Kafka) │    │   (FastAPI)     │
│                 │◀───│                 │◀───│                 │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## Technology Stack

### Message Queue Options:
1. **Redis Pub/Sub** - Simple, fast, good for real-time
2. **Apache Kafka** - Robust, scalable, good for high throughput
3. **RabbitMQ** - Feature-rich, good for complex routing
4. **Celery + Redis** - Python-native, great for background tasks

### Python AI Framework:
- **FastAPI** - Modern, async, excellent for AI APIs
- **Flask** - Lightweight, simple
- **Django** - Full-featured (if you need admin, ORM, etc.)

## Implementation Examples

### Option 1: Redis Pub/Sub (Recommended for current use case)

#### Python AI Service (FastAPI)
```python
import redis
import json
from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()
redis_client = redis.Redis(host='localhost', port=6379, db=0)

class AIRequest(BaseModel):
    user_id: str
    message: str
    context: dict = {}

@app.post("/ai/process")
async def process_ai_request(request: AIRequest):
    # Your AI/ML processing here
    result = your_ai_model.predict(request.dict())
    return {"result": result}

# Subscribe to Redis channel
def handle_ai_requests():
    pubsub = redis_client.pubsub()
    pubsub.subscribe('ai_requests')
    
    for message in pubsub.listen():
        if message['type'] == 'message':
            data = json.loads(message['data'])
            # Process AI request
            result = process_ai_request(data)
            # Publish result back
            redis_client.publish('ai_results', json.dumps(result))

if __name__ == "__main__":
    import asyncio
    asyncio.run(handle_ai_requests())
```

#### Node.js Integration
```javascript
// In your existing assistantController.js
import redis from 'redis';

const redisClient = redis.createClient({
  host: process.env.REDIS_HOST || 'localhost',
  port: process.env.REDIS_PORT || 6379
});

export const chatWithAI = async (req, res) => {
  try {
    const { message, context } = req.body;
    
    // Publish request to Redis
    const requestData = {
      user_id: req.user.id,
      message,
      context,
      timestamp: new Date().toISOString()
    };
    
    await redisClient.publish('ai_requests', JSON.stringify(requestData));
    
    // Subscribe to results (in production, use a more robust approach)
    const subscriber = redisClient.duplicate();
    subscriber.subscribe('ai_results');
    
    subscriber.on('message', (channel, message) => {
      const result = JSON.parse(message);
      res.json(result);
      subscriber.unsubscribe();
    });
    
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
```

### Option 2: Kafka (For high-scale production)

#### Python AI Service with Kafka
```python
from kafka import KafkaConsumer, KafkaProducer
import json
from fastapi import FastAPI

app = FastAPI()

consumer = KafkaConsumer(
    'ai_requests', 
    bootstrap_servers=['localhost:9092'],
    value_deserializer=lambda m: json.loads(m.decode('utf-8'))
)

producer = KafkaProducer(
    bootstrap_servers=['localhost:9092'],
    value_serializer=lambda v: json.dumps(v).encode('utf-8')
)

def process_ai_requests():
    for message in consumer:
        data = message.value
        # Process AI request
        result = your_ai_model.predict(data)
        # Send result back
        producer.send('ai_results', result)
        producer.flush()

if __name__ == "__main__":
    process_ai_requests()
```

## Updated Docker Compose Configuration

```yaml
version: '3.8'

services:
  # Node.js API (existing)
  api:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=development
      - PORT=3000
      - JWT_SECRET=dev_jwt_secret
      - DB_HOST=postgres
      - DB_PORT=5432
      - DB_NAME=ecommerce
      - DB_USER=postgres
      - DB_PASSWORD=postgres
      - REDIS_HOST=redis
      - REDIS_PORT=6379
      - KAFKA_BROKERS=kafka:9092
      - OPENAI_API_KEY=${OPENAI_API_KEY}
    volumes:
      - ./:/usr/src/app
      - /usr/src/app/node_modules
    depends_on:
      - postgres
      - redis
      - kafka
      - python-ai
    command: npm run dev
    restart: unless-stopped

  # Python AI Service (new)
  python-ai:
    build: ./ai-service
    ports:
      - "8000:8000"
    environment:
      - REDIS_HOST=redis
      - REDIS_PORT=6379
      - KAFKA_BROKERS=kafka:9092
      - OPENAI_API_KEY=${OPENAI_API_KEY}
      - GEMINI_API_KEY=${GEMINI_API_KEY}
    volumes:
      - ./ai-service:/app
    depends_on:
      - redis
      - kafka
    restart: unless-stopped

  # PostgreSQL Service (existing)
  postgres:
    image: postgres:14-alpine
    ports:
      - "5432:5432"
    environment:
      - POSTGRES_USER=postgres
      - POSTGRES_PASSWORD=postgres
      - POSTGRES_DB=ecommerce
    volumes:
      - postgres_data:/var/lib/postgresql/data
    restart: unless-stopped

  # Redis Service (existing)
  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"
    command: redis-server --save 20 1 --loglevel warning
    volumes:
      - redis_data:/data
    restart: unless-stopped

  # Zookeeper Service (existing)
  zookeeper:
    image: confluentinc/cp-zookeeper:7.3.0
    ports:
      - "2181:2181"
    environment:
      - ZOOKEEPER_CLIENT_PORT=2181
      - ZOOKEEPER_TICK_TIME=2000
    restart: unless-stopped

  # Kafka Service (existing)
  kafka:
    image: confluentinc/cp-kafka:7.3.0
    ports:
      - "9092:9092"
    environment:
      - KAFKA_BROKER_ID=1
      - KAFKA_ZOOKEEPER_CONNECT=zookeeper:2181
      - KAFKA_ADVERTISED_LISTENERS=PLAINTEXT://kafka:9092
      - KAFKA_OFFSETS_TOPIC_REPLICATION_FACTOR=1
      - KAFKA_AUTO_CREATE_TOPICS_ENABLE=true
    depends_on:
      - zookeeper
    restart: unless-stopped

volumes:
  postgres_data:
  redis_data:
```

## Benefits for Time2Crack Project

1. **Better AI Performance** - Native Python ML libraries
2. **Scalable AI Processing** - Handle multiple AI requests concurrently
3. **Reliable Communication** - Message queues ensure no requests are lost
4. **Independent Scaling** - Scale AI services separately from web API
5. **Easy Model Updates** - Deploy new AI models without affecting web API

## Migration Path

1. **Keep existing Node.js API** for web endpoints
2. **Add Python AI service** for ML processing
3. **Use Redis/Kafka** for communication
4. **Gradually migrate** AI features to Python

## Python AI Service Structure

```
ai-service/
├── Dockerfile
├── requirements.txt
├── main.py
├── models/
│   ├── __init__.py
│   ├── ai_model.py
│   └── chat_model.py
├── services/
│   ├── __init__.py
│   ├── redis_service.py
│   └── kafka_service.py
└── utils/
    ├── __init__.py
    └── logger.py
```

## Next Steps

1. Create the Python AI service directory structure
2. Set up FastAPI with Redis/Kafka integration
3. Implement AI model processing logic
4. Update Node.js controllers to use message queues
5. Test the communication between services
6. Deploy with Docker Compose

This architecture provides the best of both worlds: Node.js performance for web APIs and Python's AI/ML capabilities, with reliable message queue communication between them. 