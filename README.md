# AI-Assisted E-Commerce Backend with NestJS

A production-grade NestJS backend for an AI-assisted e-commerce platform with JWT authentication, product catalog, cart/order management, scheduled delivery system, and AI features.

## Features

- 👤 User authentication with JWT and Passport
- 🛍️ Product catalog with categories and search
- 🛒 Cart and order management
- 📅 Scheduled delivery system via Kafka
- 🚀 Redis caching for performance
- 🤖 AI integration for FAQ and product recommendations
- 🐳 Docker and Docker Compose setup
- 🔄 CI/CD with GitHub Actions
- 📚 Auto-generated API documentation with Swagger
- 🧪 Comprehensive testing with Jest
- 🔒 Built-in validation and security features

## Tech Stack

- **Backend**: NestJS, TypeScript
- **Database**: PostgreSQL with TypeORM
- **Caching**: Redis with NestJS Cache Manager
- **Message Queue**: Kafka
- **AI**: OpenAI API / Google Gemini
- **Authentication**: JWT with Passport
- **Documentation**: Swagger/OpenAPI
- **Containerization**: Docker, Docker Compose
- **Testing**: Jest, Supertest

## Getting Started

### Prerequisites

- Node.js (v18+)
- Docker and Docker Compose
- OpenAI API key (for AI features)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/ai-ecommerce-backend.git
cd ai-ecommerce-backend
```

2. Create .env file:

```bash
cp .env.example .env
```

Update the .env file with your configuration:

```env
# Database
DB_HOST=localhost
DB_PORT=5432
DB_NAME=ecommerce
DB_USER=postgres
DB_PASSWORD=postgres

# JWT
JWT_SECRET=your_jwt_secret_here
JWT_EXPIRES_IN=7d

# Redis
REDIS_HOST=localhost
REDIS_PORT=6379

# Kafka
KAFKA_BROKERS=localhost:9092

# AI Providers
AI_PROVIDER=openai
OPENAI_API_KEY=your_openai_api_key
GEMINI_API_KEY=your_gemini_api_key

# Environment
NODE_ENV=development
PORT=3000
```

3. Start the services using Docker Compose:

```bash
docker-compose up -d
```

The API will be available at http://localhost:3000.

## Development

### Local Development

For local development without Docker:

1. Install dependencies:

```bash
npm install
```

2. Start the development server:

```bash
npm run start:dev
```

The application will be available at http://localhost:3000 with hot reload enabled.

### Available Scripts

- `npm run start:dev` - Start development server with hot reload
- `npm run start:prod` - Start production server
- `npm run build` - Build the application
- `npm run test` - Run tests
- `npm run test:watch` - Run tests in watch mode
- `npm run test:cov` - Run tests with coverage
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier

## API Documentation

API documentation is automatically generated and available via Swagger UI at http://localhost:3000/api-docs when the application is running.

## Project Structure

```
src/
├── modules/           # Feature modules
│   ├── auth/         # Authentication module
│   │   ├── dto/      # Data Transfer Objects
│   │   ├── guards/   # Authentication guards
│   │   ├── strategies/ # Passport strategies
│   │   ├── auth.controller.ts
│   │   ├── auth.service.ts
│   │   └── auth.module.ts
│   ├── users/        # Users module
│   ├── products/     # Products module
│   ├── categories/   # Categories module
│   ├── cart/         # Cart module
│   ├── orders/       # Orders module
│   ├── assistant/    # AI assistant module
│   └── health/       # Health checks module
├── config/           # Configuration files
│   ├── database.config.ts
│   ├── redis.config.ts
│   └── kafka.config.ts
├── common/           # Shared utilities
│   └── utils/        # Utility functions
├── app.module.ts     # Root application module
└── main.ts           # Application entry point
```

## Core Modules

### Authentication Module

- User registration and login with JWT
- Password hashing with bcrypt
- JWT authentication guard
- Profile management

### Product & Category Module

- CRUD operations for products and categories
- Product search and filtering
- Redis caching for improved performance

### Cart & Order Module

- Add to cart, update quantity, remove items
- Place orders with delivery scheduling
- Order status tracking

### Scheduled Delivery (Kafka)

- Order events published to Kafka
- Delivery events processing
- Status updates

### AI Assistant

- FAQ chatbot using OpenAI/Gemini
- Product recommendations
- Multimodal support (text and images)

## Testing

Run tests:

```bash
npm test
```

Run tests with coverage:

```bash
npm run test:cov
```

## Deployment

The application can be deployed using Docker to any container orchestration platform. CI/CD is set up for automatic deployment to Railway.

### Docker Deployment

```bash
# Build the application
docker build -t ai-ecommerce-backend .

# Run the container
docker run -p 3000:3000 ai-ecommerce-backend
```

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `NODE_ENV` | Environment mode | `development` |
| `PORT` | Application port | `3000` |
| `DB_HOST` | Database host | `localhost` |
| `DB_PORT` | Database port | `5432` |
| `DB_NAME` | Database name | `ecommerce` |
| `DB_USER` | Database user | `postgres` |
| `DB_PASSWORD` | Database password | `postgres` |
| `JWT_SECRET` | JWT secret key | Required |
| `JWT_EXPIRES_IN` | JWT expiration time | `7d` |
| `REDIS_HOST` | Redis host | `localhost` |
| `REDIS_PORT` | Redis port | `6379` |
| `KAFKA_BROKERS` | Kafka brokers | `localhost:9092` |
| `AI_PROVIDER` | AI provider (openai/gemini) | `openai` |
| `OPENAI_API_KEY` | OpenAI API key | Required for OpenAI |
| `GEMINI_API_KEY` | Gemini API key | Required for Gemini |

## AI Provider Configuration

The backend supports both OpenAI (default) and Gemini (Google AI) for the AI assistant. To switch providers, set the following in your `.env` file:

- `AI_PROVIDER=openai` (default, uses OpenAI)
- `AI_PROVIDER=gemini` (uses Gemini Flash 2.5)
- `OPENAI_API_KEY=your_openai_key` (required for OpenAI)
- `GEMINI_API_KEY=your_gemini_key` (required for Gemini)

### Multimodal Support

The `/api/assistant/chat` endpoint supports both text and image input when using Gemini. To send an image, include it as a base64 string or file URL in the request body.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

MIT

## Support

For support, email support@example.com or join our Slack channel.