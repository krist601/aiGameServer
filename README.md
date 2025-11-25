# AI Game Server

A NestJS backend project following Hexagonal Architecture for an interactive story game with branching decisions, player attributes, achievements, and more.

## 🎯 Content Hierarchy

```
Franchise (Harry Potter, Star Wars, etc.)
  └── Book/Volume (La Piedra Filosofal, etc.)
      └── Chapter (Capítulo 1, 2, 3...)
          └── Story Stage (Escenas individuales)
              └── Decisions & Branches
```

See [CONTENT_HIERARCHY.md](./CONTENT_HIERARCHY.md) for detailed documentation.

## Features

- **Content Organization**: Franchise → Book → Chapter → Story Stage hierarchy
- **Story Management**: Create and manage story stages with branching narratives
- **Decision System**: Player choices with attribute effects and requirements
- **Player Progression**: Save system with attributes, power-ups, and achievements
- **Inventory System**: Item management for players
- **Canonical Events**: Unlockable story progression events
- **Daily Quests**: Time-limited quests with rewards
- **Friend Challenges**: Social gameplay features

## Tech Stack

- **Framework**: NestJS 11
- **Database**: MongoDB 7.0
- **Architecture**: Hexagonal Architecture (Ports & Adapters)
- **Testing**: Jest with in-memory MongoDB

## Prerequisites

- Node.js 18+ 
- Docker Desktop (for MongoDB) - [Installation Guide](./INSTALL_DOCKER.md)
- npm or yarn

## Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Install Docker (if not already installed)

**First time?** See [INSTALL_DOCKER.md](./INSTALL_DOCKER.md) for detailed instructions.

Quick check: Run `docker --version` to verify Docker is installed.

### 3. Set Up MongoDB with Docker

```bash
# Start MongoDB container (use 'docker compose' for newer versions, 'docker-compose' for older)
docker compose up -d
# or
docker-compose up -d

# Verify it's running
docker ps
```

### 3. Configure Environment

Create a `.env` file in the project root:

```env
MONGO_URI=mongodb://admin:password@localhost:27017/ai-game?authSource=admin
PORT=3000
```

### 4. Run the Application

```bash
# Development mode
npm run start:dev

# Production mode
npm run build
npm run start:prod
```

The API will be available at `http://localhost:3000`

## API Endpoints

### Content Hierarchy
- `POST /franchise` - Create a franchise
- `GET /franchise` - Get all franchises
- `GET /franchise/:id` - Get franchise by ID
- `POST /book` - Create a book
- `GET /book/franchise/:franchiseId` - Get books by franchise
- `POST /chapter` - Create a chapter
- `GET /chapter/book/:bookId` - Get chapters by book

### Story Stages
- `POST /story-stage` - Create a story stage
- `GET /story-stage/:id` - Get story stage by ID
- `PUT /story-stage/:id` - Update story stage
- `GET /story-stage/chapter/:chapter` - Get stages by chapter

### Decisions
- `POST /decision` - Create a decision
- `POST /decision-option` - Create a decision option
- `POST /decision-option/resolve/:id` - Resolve a decision option

### Player Save
- `GET /player-save/:id` - Get player save
- `PUT /player-save/:id` - Update player save
- `POST /player-save/:id/reset` - Reset player save

### Inventory
- `POST /player/:id/inventory/add` - Add item to inventory
- `POST /player/:id/inventory/remove` - Remove item from inventory
- `POST /player/:id/inventory/use` - Use an item

### Canonical Events
- `POST /canonical-event` - Create canonical event
- `POST /canonical-event/trigger/:id` - Trigger canonical event
- `GET /canonical-event/progress/:playerId` - Get canonical progress

### Daily Quests
- `GET /daily-quest/refresh` - Refresh daily quests
- `POST /daily-quest/:id/complete` - Mark quest as completed
- `POST /daily-quest/:id/claim` - Claim quest reward

### Friend Challenges
- `POST /challenge` - Create challenge
- `POST /challenge/:id/accept` - Accept challenge
- `POST /challenge/:id/resolve` - Resolve challenge

## Project Structure

```
src/
├── domain/              # Domain entities (business logic)
├── application/         # Use cases and ports (application logic)
│   ├── ports/          # Repository interfaces
│   └── use-cases/      # Business use cases
└── infrastructure/      # External adapters
    ├── controllers/    # REST API endpoints
    ├── repositories/   # MongoDB implementations
    └── schemas/        # Mongoose schemas
```

## Testing

```bash
# Unit tests
npm test

# Watch mode
npm run test:watch

# Coverage
npm run test:cov

# E2E tests
npm run test:e2e
```

## Docker Commands

```bash
# Start MongoDB
docker-compose up -d

# Stop MongoDB
docker-compose stop

# View logs
docker logs ai-game-mongodb

# Remove container (keeps data)
docker-compose down

# Remove everything including data
docker-compose down -v
```

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `MONGO_URI` | MongoDB connection string | `mongodb://localhost:27017/ai-game` |
| `PORT` | Server port | `3000` |

## Development

```bash
# Format code
npm run format

# Lint code
npm run lint

# Build
npm run build
```

## Documentation

### Setup Guides
- [DOCKER_SETUP.md](./DOCKER_SETUP.md) - Detailed MongoDB setup instructions
- [INSTALL_DOCKER.md](./INSTALL_DOCKER.md) - Docker installation guide

### Content System
- [CONTENT_HIERARCHY.md](./CONTENT_HIERARCHY.md) - Complete guide to the Franchise → Book → Chapter → Story Stage system
- [QUICK_START.md](./QUICK_START.md) - Quick examples for creating content
- [IMPLEMENTATION_SUMMARY.md](./IMPLEMENTATION_SUMMARY.md) - Technical implementation details
- [MIGRATION_GUIDE.md](./MIGRATION_GUIDE.md) - Script for migrating existing StoryStages

### API Testing
- [extra/AI_Game_API.postman_collection.json](./extra/AI_Game_API.postman_collection.json) - Postman collection with all API endpoints

## License

UNLICENSED
