# 🚀 Quick Start - Hardwave Studios Suite

## One Command Setup

```bash
cd unified-app && npm install && npm run electron:dev
```

## Build for Production

### Windows
```bash
npm run build:win
```
Output: `release/1.0.0/Hardwave Studios Suite-1.0.0-Setup.exe`

### Linux
```bash
npm run build
```
Output: `release/1.0.0/Hardwave Studios Suite-1.0.0.AppImage`

## Deploy to Website

```bash
# 1. Copy installer
cp release/1.0.0/* ../website/public/downloads/

# 2. Update database
mysql -u user -p database < ../website/database/update-products.sql

# 3. Done! Users can download from /dashboard/downloads
```

## Configuration

**Before building**, edit `.env`:
```env
VITE_API_URL=https://hardwavestudios.com
```

## Test Login

Use any account from your website database that has an active subscription.

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Login fails | Check `VITE_API_URL` in `.env` |
| No subscription | User needs active subscription in database |
| Build fails | Run `npm install` again |
| Port in use | Change port in `vite.config.ts` |

## Project Structure

```
unified-app/
├── src/
│   ├── components/
│   │   ├── LoginPage.tsx          ← Login UI
│   │   ├── SubscriptionRequired.tsx ← Subscription gate
│   │   ├── MainLayout.tsx         ← Main layout
│   │   └── apps/
│   │       ├── KickForge.tsx      ← Kick designer
│   │       ├── MelodyGenerator.tsx ← Melody tool
│   │       └── FileOrganizer.tsx  ← File manager
│   ├── store/authStore.ts         ← Auth state
│   └── services/api.ts            ← API client
├── electron/
│   ├── main.ts                    ← Electron main
│   └── preload.ts                 ← Preload script
└── .env                           ← Configuration
```

## Key Files

- **`.env`** - Set your API URL here
- **`package.json`** - Dependencies & build config
- **`src/App.tsx`** - Main app logic
- **`src/store/authStore.ts`** - Authentication

## Features

✅ Login with website credentials  
✅ Automatic subscription validation  
✅ KickForge - Layer-based kick synthesis  
✅ Melody Generator - AI melody creation  
✅ File Organizer - Sample management  
✅ Beautiful dark UI  
✅ Session persistence  

## Need Help?

📚 Read: `COMPLETE.md` for full details  
📚 Read: `DEPLOYMENT.md` for deployment guide  
📚 Read: `BUILD-INSTRUCTIONS.md` for build help  

---

**That's it! Start building amazing music production tools! 🎵**
