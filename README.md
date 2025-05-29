# AI-Assisted E-Commerce Backend

A production-grade Node.js backend for an AI-assisted e-commerce platform with JWT authentication, product catalog, cart/order management, scheduled delivery system, and AI features.

## Features

- 👤 User authentication with JWT
- 🛍️ Product catalog with categories and search
- 🛒 Cart and order management
- 📅 Scheduled delivery system via Kafka
- 🚀 Redis caching for performance
- 🤖 AI integration for FAQ and product recommendations
- 🐳 Docker and Docker Compose setup
- 🔄 CI/CD with GitHub Actions

## Tech Stack

- **Backend**: Node.js, Express
- **Database**: PostgreSQL with Sequelize ORM
- **Caching**: Redis
- **Message Queue**: Kafka
- **AI**: OpenAI API
- **Containerization**: Docker, Docker Compose
- **CI/CD**: GitHub Actions

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

Update the .env file with your configuration.

3. Start the services using Docker Compose:

```bash
docker-compose up -d
```

The API will be available at http://localhost:3000.

## API Documentation

API documentation is available via Swagger UI at http://localhost:3000/api-docs when the application is running.

## Project Structure

```
src/
├── controllers/      # Request handlers
├── models/           # DB models (Sequelize)
├── routes/           # Express routers
├── services/         # Business logic, DB, Redis, Kafka
├── middlewares/      # Auth, error handling
├── utils/            # Helper functions
├── config/           # DB, Redis, Kafka, etc.
└── index.js          # App entry point
```

## Core Modules

### Authentication Module

- User registration and login with JWT
- Password hashing with bcrypt
- Authentication middleware for protected routes

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

- FAQ chatbot using OpenAI
- Product recommendations

## Development

For local development without Docker:

1. Install dependencies:

```bash
npm install
```

2. Start the development server:

```bash
npm run dev
```

## Testing

Run tests:

```bash
npm test
```

## Deployment

The application can be deployed using Docker to any container orchestration platform. CI/CD is set up for automatic deployment to Railway.

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