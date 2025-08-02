# GitHub to Vercel Deployment Setup

## Required GitHub Secrets

Add these secrets to your GitHub repository settings (Settings → Secrets and variables → Actions):

### 1. VERCEL_TOKEN
- Go to [Vercel Dashboard](https://vercel.com/account/tokens)
- Create a new token
- Copy the token value

### 2. VERCEL_ORG_ID
- Go to your [Vercel Team Settings](https://vercel.com/teams)
- Copy your Team ID (or Personal Account ID)

### 3. VERCEL_PROJECT_ID
- Go to your Vercel project settings
- Copy the Project ID from the project settings page

## Setup Steps

1. **Connect your repository to Vercel:**
   ```bash
   npx vercel --confirm
   ```

2. **Get your project details:**
   ```bash
   npx vercel ls
   ```

3. **Add the secrets to GitHub:**
   - Go to your GitHub repo → Settings → Secrets and variables → Actions
   - Add the three secrets above

4. **Push to main branch:**
   - Automatic production deployment on push to `main`
   - Preview deployments on pull requests

## Environment Variables

Set these in your Vercel dashboard (Settings → Environment Variables):

- `OPENAI_API_KEY`: Your OpenAI API key
- `MODE`: Set to `PROD` for production

## Deployment Trigger

The workflow triggers on:
- Push to `main` branch → Production deployment
- Pull requests → Preview deployment