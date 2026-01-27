# Deployment Guide - Hardwave Studios Suite

## Overview

This guide covers how to deploy the Hardwave Studios Suite desktop application to your website for user downloads.

## Step 1: Build the Application

### For Windows Users (Recommended for Windows builds)
```bash
cd unified-app
npm install
npm run build:win
```

### For Linux Users
```bash
cd unified-app
npm install
npm run build  # Creates .AppImage
```

The built files will be in: `unified-app/release/1.0.0/`

## Step 2: Upload to Website

1. Copy the installer files to your web server:
```bash
# Windows
scp "unified-app/release/1.0.0/Hardwave Studios Suite-1.0.0-Setup.exe" \
    user@yourserver:/var/www/hardwavestudios.com/public/downloads/

# Linux
scp "unified-app/release/1.0.0/Hardwave Studios Suite-1.0.0.AppImage" \
    user@yourserver:/var/www/hardwavestudios.com/public/downloads/
```

2. Or if using the same server, move files:
```bash
cp "unified-app/release/1.0.0/"* website/public/downloads/
```

## Step 3: Update Database

Run the SQL script to update the products table:
```bash
mysql -u your_user -p your_database < website/database/update-products.sql
```

Or manually execute the SQL in your database management tool.

## Step 4: Configure Download URLs

Make sure your nginx/apache is configured to serve the downloads folder:

### Nginx
```nginx
location /downloads/ {
    alias /var/www/hardwavestudios.com/public/downloads/;
    autoindex off;
}
```

### Apache
```apache
<Directory "/var/www/hardwavestudios.com/public/downloads">
    Options -Indexes
    AllowOverride None
    Require all granted
</Directory>
```

## Step 5: Test Download Flow

1. Login to your website dashboard
2. Navigate to `/dashboard/downloads`
3. Click download button
4. Verify file downloads correctly
5. Install and test the application

## Environment Configuration

### Production API URL
The app needs to connect to your website API. Set this in `.env` before building:

```env
VITE_API_URL=https://hardwavestudios.com
```

### Building for Different Environments

**Production:**
```bash
VITE_API_URL=https://hardwavestudios.com npm run build:win
```

**Staging:**
```bash
VITE_API_URL=https://staging.hardwavestudios.com npm run build:win
```

## License Key Generation

When users subscribe via Stripe, a license key is automatically generated in the `licenses` table.

The app validates this license on login by calling:
- POST `/api/auth/login` - Returns JWT token
- GET `/api/subscription` - Verifies active subscription

## Security Considerations

1. **Protect Download URLs**: Only authenticated users with active subscriptions can download
2. **HTTPS Only**: Always serve downloads over HTTPS
3. **Rate Limiting**: Consider rate limiting the downloads API endpoint
4. **File Integrity**: Consider adding checksums for file verification

## Updating the App

To release a new version:

1. Update version in `unified-app/package.json`
2. Build for all platforms
3. Upload new files with version number in filename
4. Update database with new version and URLs
5. Notify users of update (via email or in-app notification)

## File Size Optimization

Current build size: ~120MB (includes Electron runtime)

To reduce size:
- Use `asar` packing (already enabled)
- Remove unnecessary node_modules
- Optimize images and assets
- Consider using electron-builder's compression

## Troubleshooting

### Download fails
- Check file permissions on server
- Verify download URL in database
- Check nginx/apache logs

### App won't start
- Verify user has active subscription
- Check API_URL is correct
- Review browser console for errors

### License validation fails
- Verify JWT_SECRET matches between website and app
- Check database subscription status
- Ensure API is accessible from user's network

## Monitoring

Track download metrics:
```sql
SELECT 
  product,
  platform,
  COUNT(*) as downloads,
  DATE(downloaded_at) as date
FROM downloads
GROUP BY product, platform, DATE(downloaded_at)
ORDER BY date DESC;
```

## Support

For build issues, check:
- Node.js version (18+)
- Electron-builder logs in `release/[version]/`
- TypeScript compilation errors

For deployment issues:
- Verify database schema is up to date
- Check API authentication
- Review server logs
