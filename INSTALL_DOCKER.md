# Installing Docker on macOS

## Option 1: Docker Desktop (Recommended - Easiest)

### Step 1: Download Docker Desktop
1. Go to: https://www.docker.com/products/docker-desktop/
2. Click "Download for Mac"
3. Choose the version for your Mac:
   - **Apple Silicon (M1/M2/M3)**: Download "Mac with Apple Silicon"
   - **Intel**: Download "Mac with Intel chip"

### Step 2: Install Docker Desktop
1. Open the downloaded `.dmg` file
2. Drag Docker.app to your Applications folder
3. Open Docker from Applications
4. Follow the setup wizard
5. You may need to enter your password to install networking components

### Step 3: Verify Installation
Open Terminal and run:
```bash
docker --version
docker compose version
```

You should see version numbers for both commands.

### Step 4: Start Docker Desktop
- Docker Desktop must be running (you'll see a whale icon in your menu bar)
- Wait until it says "Docker Desktop is running"

## Option 2: Using Homebrew (Alternative)

If you have Homebrew installed:

```bash
# Install Docker Desktop via Homebrew
brew install --cask docker

# Start Docker Desktop
open -a Docker

# Wait for Docker to start, then verify
docker --version
```

## After Installation

Once Docker is installed and running:

1. **Update the docker-compose command**: Newer Docker versions use `docker compose` (without hyphen) instead of `docker-compose`

2. **Start MongoDB**:
   ```bash
   docker compose up -d
   ```

3. **Verify it's running**:
   ```bash
   docker ps
   ```

## Troubleshooting

### Docker Desktop won't start
- Make sure you have enough disk space (at least 4GB free)
- Check System Preferences > Security & Privacy for any blocked permissions
- Try restarting your Mac

### Permission denied errors
- Make sure Docker Desktop is running
- You might need to add your user to the docker group (usually handled automatically on macOS)

### Still getting "command not found"
1. Make sure Docker Desktop is running (check menu bar)
2. Restart your terminal
3. Try: `which docker` - should show `/usr/local/bin/docker` or similar

## Alternative: Use MongoDB Atlas (Cloud - No Docker Needed)

If you prefer not to install Docker, you can use MongoDB Atlas (free cloud database):

1. Sign up at: https://www.mongodb.com/cloud/atlas/register
2. Create a free cluster
3. Get your connection string
4. Update `.env` with your Atlas connection string:
   ```
   MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/ai-game
   ```

No Docker installation needed!

