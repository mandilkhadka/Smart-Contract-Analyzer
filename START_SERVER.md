# How to Start the Server

## The Problem
If you're seeing just the HTML template without the React app, it means the **Vite dev server isn't running**.

## Solution

### Option 1: Use bin/dev (Recommended)
This starts both Rails and Vite servers:

```bash
bin/dev
```

This will start:
- Rails server on http://localhost:3000
- Vite dev server on http://localhost:3036

### Option 2: Start Servers Separately

**Terminal 1 - Rails:**
```bash
bin/rails server
```

**Terminal 2 - Vite:**
```bash
bin/vite dev
```

## Troubleshooting

### Port Already in Use
If you get "Address already in use" errors:

```bash
# Kill processes on ports 3000 and 3036
kill -9 $(lsof -ti:3000) 2>/dev/null
kill -9 $(lsof -ti:3036) 2>/dev/null

# Then start again
bin/dev
```

### Check if Servers are Running
```bash
# Check Rails
curl http://localhost:3000

# Check Vite
curl http://localhost:3036
```

### View Logs
If something isn't working, check the terminal output where you ran `bin/dev` for error messages.
