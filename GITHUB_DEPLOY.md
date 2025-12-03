# Deploy Flight Tracker via GitHub + Vercel

Your code is ready to deploy! Follow these simple steps:

## Step 1: Create a New GitHub Repository

1. Go to: **https://github.com/new**
2. Fill in the details:
   - **Repository name**: `flight-tracker` (or any name you prefer)
   - **Description**: "A modern flight lookup web application built with Next.js"
   - **Visibility**: Public or Private (your choice)
   - ⚠️ **DO NOT** check "Add a README file"
   - ⚠️ **DO NOT** check "Add .gitignore"
   - ⚠️ **DO NOT** choose a license yet
3. Click **"Create repository"**

## Step 2: Push Your Code to GitHub

After creating the repository, GitHub will show you commands. You'll need to run these in your terminal:

### Option A: If you see "…or push an existing repository from the command line"

Copy those commands and run them in your terminal. They should look like:

```bash
cd C:\Users\sneha\.gemini\antigravity\scratch\flight-lookup-app
git remote add origin https://github.com/YOUR_USERNAME/flight-tracker.git
git branch -M main
git push -u origin main
```

**Replace `YOUR_USERNAME` with your actual GitHub username!**

### Option B: Manual Commands

If you don't see the commands, run these (replace `YOUR_USERNAME`):

```bash
cd C:\Users\sneha\.gemini\antigravity\scratch\flight-lookup-app
git remote add origin https://github.com/YOUR_USERNAME/flight-tracker.git
git branch -M main
git push -u origin main
```

**Note**: You may be prompted to authenticate with GitHub. Follow the prompts.

## Step 3: Deploy to Vercel

1. Go to: **https://vercel.com/new**
2. Click **"Continue with GitHub"** and authorize Vercel
3. Click **"Import"** next to your `flight-tracker` repository
4. Vercel will auto-detect Next.js settings - just click **"Deploy"**
5. Wait ~2 minutes for deployment to complete

## Step 4: Get Your Live URL

Once deployed, Vercel will give you a URL like:
- `https://flight-tracker.vercel.app`
- Or `https://flight-tracker-YOUR_USERNAME.vercel.app`

You can customize this in Vercel's project settings!

---

## Quick Reference Commands

```bash
# Navigate to your project
cd C:\Users\sneha\.gemini\antigravity\scratch\flight-lookup-app

# Add GitHub remote (replace YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/flight-tracker.git

# Rename branch to main
git branch -M main

# Push to GitHub
git push -u origin main
```

---

## Troubleshooting

### If git push asks for authentication:
- GitHub now requires Personal Access Tokens (PAT) instead of passwords
- Go to: https://github.com/settings/tokens
- Generate a new token with `repo` permissions
- Use the token as your password when prompted

### Alternative: Use GitHub Desktop
1. Download GitHub Desktop: https://desktop.github.com/
2. Open the app and sign in
3. Click "Add" → "Add Existing Repository"
4. Select: `C:\Users\sneha\.gemini\antigravity\scratch\flight-lookup-app`
5. Click "Publish repository"
6. Then deploy via Vercel as described above

---

## What's Next?

After deployment:
- ✅ Your app will be live at a public URL
- ✅ Every time you push to GitHub, Vercel auto-deploys
- ✅ You can add a custom domain in Vercel settings
- ✅ Free SSL certificate included

**Your code is ready - just follow the steps above!** 🚀
