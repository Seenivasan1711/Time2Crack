# Time2Crack Backend with NestJS

A production-grade NestJS backend for the Time2Crack Premium Crackers & Sweets platform with JWT authentication, product catalog, cart/order management, scheduled delivery system, and AI features.

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
- 🗄️ **Database migrations with TypeORM**

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
- **Migrations**: TypeORM Migrations

## Getting Started

### Prerequisites

- Node.js (v18+)
- Docker and Docker Compose
- OpenAI API key (for AI features)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/time2crack-backend.git
cd time2crack-backend
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
DB_NAME=time2crack
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

## Database Management

### Automatic Database Setup

The application automatically:
- Creates the `time2crack` database if it doesn't exist
- Runs all pending migrations on startup
- Sets up all required tables and indexes

### Manual Migration Commands

```bash
# Generate a new migration
npm run migration:generate -- src/migrations/MigrationName

# Run pending migrations
npm run migration:run

# Revert last migration
npm run migration:revert

# Show migration status
npm run migration:show

# Sync schema (development only)
npm run schema:sync

# Drop schema (development only)
npm run schema:drop
```

### Database Structure

The application includes the following tables:
- **users** - User accounts and authentication
- **categories** - Product categories
- **products** - Product catalog
- **cart** - Shopping cart items
- **orders** - Order management
- **order_items** - Order line items

## Development

### Local Development

For local development without Docker:

1. Install dependencies:

```bash
npm install
```

2. Start PostgreSQL and Redis locally:

```bash
# PostgreSQL
brew install postgresql
brew services start postgresql

# Redis
brew install redis
brew services start redis
```

3. Start the development server:

```bash
npm run start:dev
```

The application will automatically:
- Create the database if it doesn't exist
- Run all migrations
- Start the development server

### API Documentation

Once the application is running, you can access:
- **Swagger UI**: http://localhost:3000/api-docs
- **Health Check**: http://localhost:3000/api/health

## Testing

Run tests:

```bash
# Unit tests
npm test

# E2E tests
npm run test:e2e

# Test coverage
npm run test:cov
```

## Deployment

The application can be deployed using Docker to any container orchestration platform. CI/CD is set up for automatic deployment.

### Production Considerations

- Set `NODE_ENV=production`
- Use strong JWT secrets
- Configure SSL certificates
- Set up proper logging
- Use production database credentials
- Disable `synchronize` in TypeORM config

## License

MIT

## AI Provider Configuration

The backend supports both OpenAI (default) and Gemini (Google AI) for the AI assistant. To switch providers, set the following in your `.env` file:

- `AI_PROVIDER=openai` (default, uses OpenAI)
- `AI_PROVIDER=gemini` (uses Gemini Flash 2.5)
- `OPENAI_API_KEY=your_openai_key` (required for OpenAI)
- `GEMINI_API_KEY=your_gemini_key` (required for Gemini)

### Multimodal Support

The `/api/assistant/chat` endpoint supports both text and image input when using Gemini. To send an image, include it as a base64 string or file URL in the request body.