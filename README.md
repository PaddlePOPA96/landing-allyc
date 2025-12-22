# Jasmine Allyc Landing Page

A modern, dynamic landing page for Jasmine Allyc built with Next.js, featuring Firebase integration for content management and real-time updates.

## Features

- 🎨 Modern, responsive design with glassmorphism effects
- 🔥 Firebase integration for dynamic content
- 🔒 Secure Firestore rules with authentication
- 📊 Real-time social media statistics
- 🎮 Gaming setup showcase
- 📱 Instagram feed integration
- 🎬 YouTube video gallery
- 🤝 Sponsors/partners section
- 🎯 SEO optimized

## Getting Started

### Prerequisites

- Node.js 18+ installed
- Firebase project created ([Firebase Console](https://console.firebase.google.com/))
- npm or yarn package manager

### Installation

1. **Clone the repository and install dependencies:**

```bash
npm install
# or
yarn install
```

2. **Set up environment variables:**

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

Get these values from Firebase Console → Project Settings → General → Your apps → SDK setup and configuration.

3. **Deploy Firestore Security Rules:**

**Option A: Via Firebase Console**
- Go to [Firebase Console](https://console.firebase.google.com/)
- Select your project
- Navigate to Firestore Database → Rules
- Copy the contents of `firestore.rules`
- Paste and publish

**Option B: Via Firebase CLI**
```bash
# Install Firebase CLI if not already installed
npm install -g firebase-tools

# Login to Firebase
firebase login

# Initialize Firebase in your project
firebase init firestore

# Deploy rules
firebase deploy --only firestore:rules
```

4. **Initialize Firebase Data:**

Run the initialization script to populate your database with initial social media configuration:

```bash
npx ts-node scripts/init-firebase-data.ts
```

Or manually enter the data through the dashboard at `/dashboard/stats` after logging in.

5. **Run the development server:**

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) to see the landing page.

## Dashboard Access

The dashboard is located at `/dashboard` and requires authentication.

### Setting up Admin Users

1. Go to Firebase Console → Authentication
2. Enable Email/Password authentication
3. Add users who should have dashboard access
4. Share credentials securely with authorized users

### Dashboard Features

- **Stats Management** (`/dashboard/stats`): Update social media follower counts and profile links
- **Instagram Posts** (`/dashboard/instagram`): Manage Instagram feed posts
- **Sponsors** (`/dashboard/sponsors`): Add/remove sponsor logos and links
- **YouTube Videos** (`/dashboard/youtube`): Manage featured YouTube videos
- **Gear** (`/dashboard/gear`): Update gaming setup/gear items

## Security

This application implements comprehensive security measures:

- ✅ Firestore security rules with authenticated-only writes
- ✅ Public read access for landing page content
- ✅ Environment variables for sensitive configuration
- ✅ Data validation on all write operations

For detailed security information, see [SECURITY.md](./SECURITY.md).

## Project Structure

```
├── src/
│   ├── app/              # Next.js app directory
│   │   ├── dashboard/    # Dashboard pages (authenticated)
│   │   └── page.tsx      # Landing page
│   ├── components/       # React components
│   ├── lib/              # Utilities and Firebase config
│   └── context/          # React context providers
├── public/               # Static assets
├── scripts/              # Utility scripts
│   └── init-firebase-data.ts
├── firestore.rules       # Firestore security rules
└── SECURITY.md          # Security documentation
```

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import your repository in [Vercel](https://vercel.com)
3. Add environment variables in Vercel project settings
4. Deploy

The easiest way to deploy is using the [Vercel Platform](https://vercel.com/new).

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

### Post-Deployment

1. Ensure Firestore security rules are deployed
2. Run the initialization script or populate data via dashboard
3. Test all dashboard features with authentication
4. Verify the landing page displays correctly

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Firebase Documentation](https://firebase.google.com/docs)
- [Firestore Security Rules](https://firebase.google.com/docs/firestore/security/get-started)

## Support

For issues or questions, please check:
- [SECURITY.md](./SECURITY.md) for security-related questions
- Firebase Console for database and authentication issues
- Vercel Dashboard for deployment issues

