# Deployment Guide

## Local setup

1. Install dependencies.
2. Copy `.env.example` to `.env` and fill in values.
3. Seed the database if you want sample products.
4. Start the app.

```bash
npm install
npm run seed:products --workspace server
npm run dev
```

## Environment variables

Set these values before running the app:

- `MONGODB_URI`
- `JWT_SECRET`
- `ADMIN_EMAIL`
- `ADMIN_PASSWORD_HASH`
- `CLOUDINARY_CLOUD_NAME`
- `CLOUDINARY_API_KEY`
- `CLOUDINARY_API_SECRET`
- `CLIENT_URL`
- `PORT`

## Vercel deployment

- Deploy the React frontend from the `client` folder.
- Use the `api/index.js` serverless entrypoint for backend routes.
- Set the same environment variables in the Vercel project settings.
- Point `CLIENT_URL` to the deployed frontend URL.
- Connect MongoDB Atlas and Cloudinary before enabling the admin dashboard.

## Admin access

There is no public registration. Create the admin account by setting:

- `ADMIN_EMAIL`
- `ADMIN_PASSWORD_HASH`

Use a bcrypt hash for the password. The app will create the admin record on first login if it does not already exist.
