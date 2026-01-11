# Screenshots

This directory contains screenshots of the Smart Contract Analyzer application.

## How to Take Screenshots

### Option 1: Manual Screenshots
1. Start the application: `bin/dev`
2. Open http://localhost:3000 in your browser
3. Navigate through the app and take screenshots:
   - Home page (upload interface)
   - Analysis results page
   - Contract history page
   - Statistics page
4. Save screenshots with descriptive names:
   - `upload-page.png`
   - `analysis-dashboard.png`
   - `contract-history.png`
   - `statistics.png`

### Option 2: Using Browser DevTools
1. Open Chrome DevTools (F12)
2. Use the device toolbar (Ctrl+Shift+M)
3. Set viewport to 1920x1080
4. Take screenshots using the camera icon or Cmd+Shift+P > "Capture screenshot"

### Option 3: Using Selenium (Automated)
Run the system tests which include screenshot capabilities:
```bash
rails test:system
```

## Required Screenshots

- [ ] `upload-page.png` - Home page with upload form
- [ ] `analysis-dashboard.png` - Analysis results showing risk score and risks
- [ ] `contract-history.png` - List of all analyzed contracts
- [ ] `statistics.png` - Statistics dashboard
