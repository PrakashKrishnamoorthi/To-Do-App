# Vercel Deployment Guide for TaskFlow

## Quick Deploy to Vercel

TaskFlow is optimized for Vercel deployment with zero configuration needed.

### Method 1: One-Click Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/taskflow)

### Method 2: Manual Deployment

1. **Push to GitHub**

   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Import to Vercel**

   - Visit [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Vercel will automatically detect it as a React project

3. **Configure (if needed)**

   - Build Command: `npm run build:static`
   - Output Directory: `dist`
   - Install Command: `npm install`

4. **Deploy**
   - Click "Deploy"
   - Your app will be live in minutes!

## Configuration Details

### Build Settings

The project includes a `vercel.json` configuration that tells Vercel:

- **Framework**: Vite (React)
- **Build Command**: `npm run build:static`
- **Output Directory**: `dist`
- **Rewrites**: SPA routing support

### Environment Variables

If you need to add environment variables:

1. Go to your Vercel project dashboard
2. Navigate to Settings → Environment Variables
3. Add any required variables

### Custom Domain

1. In your Vercel project dashboard
2. Go to Settings → Domains
3. Add your custom domain
4. Follow Vercel's DNS configuration guide

## Automatic Deployments

Once connected to GitHub:

- **Production**: Every push to `main` branch
- **Preview**: Every pull request gets a preview URL
- **Instant Rollback**: One-click rollback to previous versions

## Performance Features

Vercel automatically provides:

- ✅ **Global CDN**: Fast loading worldwide
- ✅ **Automatic HTTPS**: SSL certificates
- ✅ **Image Optimization**: Optimized images
- ✅ **Edge Functions**: Serverless at the edge
- ✅ **Analytics**: Built-in performance analytics

## Troubleshooting

### Build Fails

If the build fails, check:

1. **Node Version**: Ensure Node.js 16+ is specified
2. **Dependencies**: Run `npm install` locally first
3. **TypeScript**: Run `npm run typecheck` to catch errors

### Routing Issues

For SPA routing problems:

1. Ensure `vercel.json` has the rewrite rule
2. Check that all routes are handled by React Router
3. Verify the build output includes `index.html`

### Performance Issues

To optimize performance:

1. **Bundle Analysis**: Use `npm run build` and check bundle size
2. **Images**: Ensure images are optimized
3. **Code Splitting**: Use React.lazy() for large components

## Alternative Platforms

### Netlify

```bash
npm run build:static
# Drag and drop the 'dist' folder to Netlify
```

### GitHub Pages

```bash
npm install -g gh-pages
npm run build:static
npx gh-pages -d dist
```

### Firebase Hosting

```bash
npm install -g firebase-tools
npm run build:static
firebase init hosting
firebase deploy
```

## Support

For deployment issues:

1. Check [Vercel Documentation](https://vercel.com/docs)
2. Visit [TaskFlow GitHub Issues](https://github.com/yourusername/taskflow/issues)
3. Contact Vercel Support for platform-specific issues

---

**Happy Deploying! 🚀**
