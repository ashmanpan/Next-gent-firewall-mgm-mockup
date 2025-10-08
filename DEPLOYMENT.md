# AWS Amplify Deployment Guide

## Quick Start (5 minutes)

### 1. Install Dependencies
```bash
cd /home/kpanse/wsl-myprojects/nextgen-firewall-management
npm install
```

### 2. Test Locally
```bash
npm run dev
```
Visit http://localhost:3000 to view the application.

### 3. Build for Production
```bash
npm run build
```

This will:
- Build the Next.js application
- Generate static files in the `/out` directory
- Optimize assets for production

## AWS Amplify Deployment

### Method 1: GitHub Integration (Recommended)

#### Step 1: Create GitHub Repository
```bash
# Initialize git if not already done
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: Cisco Firewall AI Monitor"

# Create a new repository on GitHub, then:
git remote add origin https://github.com/YOUR_USERNAME/firewall-ai-monitor.git
git branch -M main
git push -u origin main
```

#### Step 2: Deploy on AWS Amplify
1. Go to [AWS Amplify Console](https://console.aws.amazon.com/amplify/)
2. Click **"New app"** → **"Host web app"**
3. Select **GitHub** as your Git provider
4. Authorize AWS Amplify to access your repository
5. Select your repository: `firewall-ai-monitor`
6. Select branch: `main`
7. AWS will auto-detect the build settings from `amplify.yml`
8. Click **"Save and Deploy"**

#### Step 3: Wait for Deployment
- Build time: ~3-5 minutes
- You'll get a URL like: `https://main.d1234abcd.amplifyapp.com`

### Method 2: Manual Deployment

#### Step 1: Build Locally
```bash
npm run build
```

#### Step 2: Deploy via Amplify CLI
```bash
# Install Amplify CLI
npm install -g @aws-amplify/cli

# Configure Amplify
amplify configure

# Initialize Amplify in your project
amplify init

# Add hosting
amplify add hosting

# Select: "Hosting with Amplify Console (Managed hosting with custom domains, Continuous deployment)"

# Publish
amplify publish
```

### Method 3: Drag & Drop Deployment

#### Step 1: Build Static Files
```bash
npm run build
```
This creates an `/out` directory with static files.

#### Step 2: Upload to Amplify
1. Go to [AWS Amplify Console](https://console.aws.amazon.com/amplify/)
2. Click **"New app"** → **"Deploy without Git"**
3. Give your app a name: `cisco-firewall-ai-monitor`
4. Drag and drop the `/out` folder
5. Click **"Save and Deploy"**

## Custom Domain Configuration

### Using AWS Route 53
1. In Amplify Console, click **"Domain management"**
2. Click **"Add domain"**
3. Enter your domain (e.g., `firewall-monitor.yourdomain.com`)
4. Amplify will automatically configure:
   - SSL certificate (via AWS Certificate Manager)
   - CloudFront CDN
   - DNS records

### Using External DNS Provider
1. In Amplify Console, click **"Domain management"** → **"Add domain"**
2. Follow instructions to add CNAME records to your DNS provider
3. Wait for DNS propagation (up to 48 hours)

## Environment Variables (Optional)

If you need to configure API endpoints:

1. In Amplify Console, go to **"Environment variables"**
2. Add variables:
   ```
   NEXT_PUBLIC_FMC_API_URL = https://your-fmc-api.com
   NEXT_PUBLIC_API_KEY = your-api-key
   ```
3. Redeploy the application

## Continuous Deployment

Once connected to GitHub, every push to `main` branch will:
1. Trigger automatic build
2. Run tests (if configured)
3. Deploy to production
4. Update the live URL

### Branch Deployments
- **main** → Production (`https://main.d1234.amplifyapp.com`)
- **develop** → Staging (`https://develop.d1234.amplifyapp.com`)
- **feature/xyz** → Preview (`https://feature-xyz.d1234.amplifyapp.com`)

## Performance Optimization

### Enabled by Default:
- ✅ CloudFront CDN distribution
- ✅ Automatic GZIP compression
- ✅ Image optimization
- ✅ SSL/TLS encryption
- ✅ HTTP/2 support
- ✅ Global edge locations

### Additional Optimizations:
1. **Caching**: Configured in `next.config.js`
2. **Asset Optimization**: Tailwind CSS purges unused styles
3. **Code Splitting**: Next.js automatically splits code

## Monitoring & Analytics

### AWS Amplify Built-in:
1. **Metrics Dashboard**: View traffic, requests, data transfer
2. **Build History**: Track all deployments
3. **Access Logs**: Monitor application usage
4. **Alarms**: Set up CloudWatch alarms

### Enable CloudWatch:
```bash
# View logs
amplify console analytics
```

## Troubleshooting

### Build Fails
**Issue**: `npm run build` fails in Amplify

**Solution**:
1. Check `amplify.yml` syntax
2. Verify all dependencies in `package.json`
3. Check build logs in Amplify Console

### 404 Errors
**Issue**: Page not found after deployment

**Solution**:
1. Ensure `next.config.js` has `output: 'export'`
2. Check that files exist in `/out` directory
3. Verify routing configuration

### Slow Load Times
**Issue**: Application loads slowly

**Solution**:
1. Enable CloudFront caching
2. Optimize images (use Next.js Image component)
3. Check bundle size: `npm run build` shows bundle analysis

## Cost Estimation

### AWS Amplify Pricing (as of 2024):
- **Build & Deploy**: $0.01 per build minute
- **Hosting**: $0.15 per GB stored + $0.15 per GB served
- **SSL Certificate**: Free (via AWS Certificate Manager)

### Typical Monthly Cost:
- **Small Project**: $5-15/month (< 10 GB traffic)
- **Medium Project**: $20-50/month (10-50 GB traffic)
- **Large Project**: $100+/month (> 100 GB traffic)

## Security Best Practices

1. **Enable HTTPS**: Automatic with Amplify
2. **Authentication**: Consider adding AWS Cognito for user auth
3. **API Keys**: Store in environment variables, never in code
4. **Access Control**: Use IAM roles to restrict access
5. **Security Headers**: Configure in Amplify Console

## Backup & Rollback

### Rollback to Previous Version:
1. Go to Amplify Console
2. Click **"Deployments"**
3. Find previous successful build
4. Click **"Redeploy this version"**

### Backup Strategy:
- Git repository serves as backup
- Amplify keeps deployment history
- Export `/out` folder after each build

## Support Resources

- [AWS Amplify Documentation](https://docs.aws.amazon.com/amplify/)
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

---

## Quick Commands Reference

```bash
# Development
npm run dev              # Start dev server
npm run build            # Build for production
npm run start            # Start production server
npm run lint             # Run linter

# Deployment
git push origin main     # Trigger auto-deploy (GitHub method)
amplify publish          # Manual deploy (CLI method)

# Troubleshooting
npm run build            # Test local build
amplify console          # Open Amplify console
amplify logs             # View deployment logs
```

---

**Ready to Deploy!** 🚀

Your Cisco Firewall AI Monitoring solution is now ready for AWS Amplify deployment.
