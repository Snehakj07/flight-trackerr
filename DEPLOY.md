# Deploy Flight Tracker to Vercel

Follow these steps to deploy your Flight Tracker app to Vercel and get a public URL like `https://flight-tracker.vercel.app`

## Prerequisites

✅ Git repository initialized (already done!)  
✅ Code committed (already done!)

## Deployment Steps

### Option 1: Deploy via Vercel CLI (Fastest)

1. **Install Vercel CLI** (if not already installed):
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**:
   ```bash
   vercel login
   ```
   This will open your browser to authenticate.

3. **Deploy**:
   ```bash
   cd C:\Users\sneha\.gemini\antigravity\scratch\flight-lookup-app
   vercel
   ```
   
4. **Follow the prompts**:
   - Set up and deploy? **Y**
   - Which scope? Choose your account
   - Link to existing project? **N**
   - What's your project's name? **flight-tracker** (or your preferred name)
   - In which directory is your code located? **./** (press Enter)
   - Want to override settings? **N**

5. **Deploy to production**:
   ```bash
   vercel --prod
   ```

Your app will be live at: `https://flight-tracker.vercel.app` (or similar)

---

### Option 2: Deploy via Vercel Dashboard (Recommended for first-time users)

1. **Push to GitHub** (if you have a GitHub account):
   - Create a new repository on GitHub: https://github.com/new
   - Name it `flight-tracker`
   - Copy the commands GitHub provides, something like:
     ```bash
     git remote add origin https://github.com/YOUR_USERNAME/flight-tracker.git
     git branch -M main
     git push -u origin main
     ```

2. **Connect to Vercel**:
   - Go to https://vercel.com
   - Click "Add New Project"
   - Import your GitHub repository
   - Vercel will auto-detect Next.js settings
   - Click "Deploy"

3. **Done!** Your app will be live at `https://flight-tracker.vercel.app`

---

### Option 3: Deploy Directly from Local (No GitHub)

1. Go to https://vercel.com and sign up/login
2. Install Vercel CLI: `npm install -g vercel`
3. Run `vercel` in your project directory
4. Follow the prompts
5. Your app will be deployed!

---

## Custom Domain (Optional)

Once deployed, you can:
- Use the free `.vercel.app` subdomain
- Add a custom domain in Vercel dashboard (Settings → Domains)

## Environment Variables

Your app uses a mock API, so no environment variables are needed. If you later connect to a real API, you can add environment variables in the Vercel dashboard.

---

## Next Steps After Deployment

1. Visit your live URL
2. Test the flight search functionality
3. Share the link with others!

Your app is production-ready and will automatically redeploy whenever you push changes to your repository.
