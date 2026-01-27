# Hardwave Studios Suite

All-in-One Desktop Application combining KickForge, Melody Generator, and File Organizer.

## Features

- **Authentication**: Login with your Hardwave Studios account
- **Subscription Validation**: Automatic subscription check
- **KickForge**: Professional kick designer for hardstyle and hardcore
- **Melody Generator**: AI-powered melody creation with MIDI export
- **File Organizer**: Intelligent sample library management

## Installation

```bash
npm install
```

## Development

```bash
npm run electron:dev
```

## Build for Windows

```bash
npm run build:win
```

This will create a Windows installer in the `release` folder.

## Configuration

Copy `.env.example` to `.env` and configure your API URL:

```
VITE_API_URL=https://hardwavestudios.com
```

## Requirements

- Node.js 18+
- Active Hardwave Studios subscription

## License

Proprietary - Hardwave Studios
