# MongoDB Docker Setup Guide

This guide will help you set up MongoDB using Docker for the AI Game project.

## Prerequisites

1. **Docker Desktop** (or Docker Engine + Docker Compose)
   - Download from: https://www.docker.com/products/docker-desktop
   - Or install Docker Compose separately if using Linux

## Quick Start

### 1. Install Docker (if not already installed)

See [INSTALL_DOCKER.md](./INSTALL_DOCKER.md) for detailed installation instructions.

**Quick check**: Run `docker --version` to see if Docker is installed.

### 2. Start MongoDB Container

**Note**: Newer Docker versions use `docker compose` (without hyphen). If you get an error, try both:

```bash
# Try this first (newer Docker versions)
docker compose up -d

# Or this (older versions)
docker-compose up -d
```

This will:
- Pull the MongoDB 7.0 image (if not already downloaded)
- Create and start a MongoDB container
- Expose MongoDB on port 27017
- Create persistent volumes for data storage

### 2. Create Environment File

Create a `.env` file in the project root:

```bash
# Copy the example (if you have one) or create manually
cat > .env << EOF
MONGO_URI=mongodb://admin:password@localhost:27017/ai-game?authSource=admin
PORT=3000
EOF
```

Or manually create `.env` with:
```
MONGO_URI=mongodb://admin:password@localhost:27017/ai-game?authSource=admin
PORT=3000
```

### 3. Verify MongoDB is Running

```bash
# Check if container is running
docker ps

# View MongoDB logs
docker logs ai-game-mongodb

# Test connection (optional)
docker exec -it ai-game-mongodb mongosh -u admin -p password --authenticationDatabase admin
```

### 4. Start Your Application

```bash
npm run start:dev
```

## Docker Commands Reference

**Note**: Use `docker compose` (without hyphen) for newer Docker versions, or `docker-compose` for older versions.

### Start MongoDB
```bash
docker compose up -d
# or
docker-compose up -d
```

### Stop MongoDB (keeps data)
```bash
docker compose stop
# or
docker-compose stop
```

### Stop and Remove MongoDB (keeps data volumes)
```bash
docker compose down
# or
docker-compose down
```

### Stop and Remove Everything (⚠️ deletes data)
```bash
docker compose down -v
# or
docker-compose down -v
```

### View MongoDB Logs
```bash
docker logs ai-game-mongodb
# Or follow logs in real-time
docker logs -f ai-game-mongodb
```

### Access MongoDB Shell
```bash
docker exec -it ai-game-mongodb mongosh -u admin -p password --authenticationDatabase admin
```

### Restart MongoDB
```bash
docker-compose restart
```

## MongoDB Connection Details

- **Host**: localhost
- **Port**: 27017
- **Database**: ai-game
- **Username**: admin
- **Password**: password
- **Connection String**: `mongodb://admin:password@localhost:27017/ai-game?authSource=admin`

## Security Note

⚠️ **Important**: The default credentials (admin/password) are for development only!

For production:
1. Change the credentials in `docker-compose.yml`
2. Use environment variables for sensitive data
3. Consider using Docker secrets or external secret management

## Troubleshooting

### Port Already in Use
If port 27017 is already in use:
1. Check what's using it: `lsof -i :27017` (Mac/Linux) or `netstat -ano | findstr :27017` (Windows)
2. Change the port in `docker-compose.yml`:
   ```yaml
   ports:
     - "27018:27017"  # Use 27018 instead
   ```
3. Update `.env`: `MONGO_URI=mongodb://admin:password@localhost:27018/ai-game?authSource=admin`

### Container Won't Start
```bash
# Check logs
docker logs ai-game-mongodb

# Remove and recreate
docker compose down -v
docker compose up -d
# or
docker-compose down -v
docker-compose up -d
```

### Can't Connect from Application
1. Verify container is running: `docker ps`
2. Check MongoDB logs: `docker logs ai-game-mongodb`
3. Verify connection string in `.env` matches docker-compose.yml credentials
4. Test connection manually using mongosh (see above)

## Data Persistence

Data is stored in Docker volumes:
- `mongodb_data`: Database files
- `mongodb_config`: Configuration files

These persist even if you stop/remove the container. To completely reset:
```bash
docker compose down -v
# or
docker-compose down -v
```

## Alternative: Local MongoDB Installation

If you prefer not to use Docker, you can install MongoDB locally:

### macOS (using Homebrew)
```bash
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
```

### Ubuntu/Debian
```bash
sudo apt-get install -y mongodb
sudo systemctl start mongodb
```

### Windows
Download from: https://www.mongodb.com/try/download/community

Then update `.env`:
```
MONGO_URI=mongodb://localhost:27017/ai-game
```

