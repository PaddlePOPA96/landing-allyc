# Security Documentation

This document outlines the security measures implemented in the Jasmine Allyc landing page application.

## Firebase Security Rules

### Overview
The application uses Firestore security rules to protect data while allowing public read access for the landing page content.

### Security Model

**Public Read Access:**
- All collections are publicly readable to support the landing page
- No authentication required for viewing content

**Authenticated Write Access:**
- All write operations require authentication
- Only logged-in dashboard users can create, update, or delete content

### Protected Collections

1. **`posts`** - Instagram posts
   - Read: Public
   - Write: Authenticated only

2. **`sponsors`** - Partner/sponsor information
   - Read: Public
   - Write: Authenticated only

3. **`youtube_videos`** - YouTube video data
   - Read: Public
   - Write: Authenticated only

4. **`gear`** - Gaming setup/gear items
   - Read: Public
   - Write: Authenticated only

5. **`configs/social_stats`** - Social media statistics and links
   - Read: Public
   - Write: Authenticated only
   - **Special validation**: Ensures all required fields are present and correct data types
   - **Deletion protected**: Cannot be deleted, only updated

### Deploying Security Rules

To deploy the Firestore security rules:

1. **Via Firebase Console:**
   - Go to [Firebase Console](https://console.firebase.google.com/)
   - Select your project
   - Navigate to Firestore Database → Rules
   - Copy the contents of `firestore.rules`
   - Paste and publish

2. **Via Firebase CLI:**
   ```bash
   firebase deploy --only firestore:rules
   ```

## Environment Variables

### Required Variables
All Firebase configuration is stored in environment variables to keep sensitive data secure:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

### Protection
- Never commit `.env` or `.env.local` files to version control
- `.gitignore` is configured to exclude these files
- Use Vercel environment variables for production deployment

## Authentication

### Dashboard Access
- Dashboard routes require authentication
- Implemented via Firebase Authentication
- Only authenticated users can modify content

### User Management
- Manage users through Firebase Console → Authentication
- Add authorized users who should have dashboard access

## Data Initialization

### First-Time Setup

After deploying security rules, initialize the social configuration data:

**Option 1: Using the initialization script**
```bash
npx ts-node scripts/init-firebase-data.ts
```

**Option 2: Via Dashboard**
1. Log in to the dashboard
2. Navigate to `/dashboard/stats`
3. Enter all social media statistics and links
4. Click "Save Configs"

### Data Validation
The `configs/social_stats` document requires all fields:
- `instagramStats` (string)
- `youtubeStats` (string)
- `instagramLink` (string)
- `tiktokLink` (string)
- `whatsappLink` (string)
- `discordLink` (string)

## Best Practices

1. **Regular Security Audits**
   - Review Firebase security rules periodically
   - Check for unauthorized access in Firebase Console → Authentication

2. **Least Privilege Principle**
   - Only grant dashboard access to trusted users
   - Regularly review user list and remove inactive users

3. **Monitoring**
   - Monitor Firestore usage in Firebase Console
   - Set up alerts for unusual activity

4. **Backup**
   - Regularly export Firestore data
   - Keep backups of critical configuration

5. **API Key Protection**
   - While Firebase API keys are safe to expose (they're restricted by domain)
   - Always use environment variables for consistency
   - Configure authorized domains in Firebase Console

## Incident Response

If you suspect unauthorized access:

1. Immediately review Firebase Console → Authentication for unknown users
2. Check Firestore activity logs
3. Rotate credentials if necessary
4. Review and update security rules
5. Change dashboard user passwords

## Support

For security concerns or questions:
- Review [Firebase Security Documentation](https://firebase.google.com/docs/rules)
- Check Firebase Console for security recommendations
- Contact your development team
