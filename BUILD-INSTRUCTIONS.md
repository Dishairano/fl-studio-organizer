# Build Instructions - Hardwave Studios Suite

## Prerequisites

- Node.js 18+
- npm or yarn

## Development

1. Install dependencies:
```bash
npm install
```

2. Run in development mode:
```bash
npm run electron:dev
```

## Building for Production

### Windows (from Windows machine)
```bash
npm run build:win
```

This will create:
- `release/[version]/Hardwave Studios Suite-[version]-Setup.exe` - NSIS installer

### Linux (from Linux machine)
```bash
npm run build
```

This will create:
- `release/[version]/Hardwave Studios Suite-[version].AppImage`

### macOS (from macOS machine)
```bash
npm run build
```

## Build Output

All builds will be in the `release/[version]` folder.

## Configuration

### API URL
Set the API URL in `.env`:
```
VITE_API_URL=https://hardwavestudios.com
```

For local development:
```
VITE_API_URL=http://localhost:3000
```

## Cross-Platform Building

To build for Windows from Linux, you need Wine:
```bash
# Install Wine first
sudo apt install wine64

# Then build
npm run build:win
```

## Troubleshooting

### "better-sqlite3" native module error
Run: `npm rebuild better-sqlite3 --update-binary`

### Build fails on Windows
Make sure you have Windows Build Tools installed:
```bash
npm install --global windows-build-tools
```

## Release Checklist

1. Update version in `package.json`
2. Build for all platforms
3. Test installers on each platform
4. Upload to website downloads folder
5. Update database with new version info
