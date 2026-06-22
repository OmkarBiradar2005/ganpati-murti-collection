# Shree Ganpati Murti Collection

A modern, responsive catalog website for browsing Ganpati murtis by model number, size, price, and availability. Customers contact the owner directly through WhatsApp or phone. Admins can log in, upload real photos, and manage the catalog through a secure dashboard.

## Tech Stack

- Frontend: React, Vite, Tailwind CSS
- Backend: Node.js, Express.js
- Database: MongoDB Atlas, Mongoose
- Authentication: JWT, bcryptjs
- Image Uploads: Cloudinary
- Deployment: Vercel for the frontend and API, MongoDB Atlas for data

## Project Structure

- `client` - public website and admin UI
- `server` - Express API, auth, models, and upload handling
- `api` - Vercel serverless entrypoint for the API

## Setup

1. Install dependencies from the root, client, and server folders.
2. Copy `.env.example` to `.env` and fill in your secrets.
3. Start MongoDB Atlas and add the connection string.
4. Create a bcrypt password hash for the owner account and place it in `ADMIN_PASSWORD_HASH`.
5. Run the frontend and backend locally.
6. Optionally seed sample products with the server seed script.

The client also supports `client/.env.example` if you want to override the API URL for the Vite app.

If you do not set `MONGODB_URI`, you can still sign in locally using the demo fallback credentials:

- Email: `biradaromkar2005@gmail.com`
- Password: `Omkar@2005`

## Local Development

```bash
npm install
npm run dev
```

If you prefer separate terminals:

```bash
cd server
npm install
npm run dev
```

```bash
cd client
npm install
npm run dev
```

To seed the sample catalog:

```bash
npm run seed:products --workspace server
```

## Environment Variables

Use the root `.env.example` as the template.

- `MONGODB_URI`
- `JWT_SECRET`
- `ADMIN_EMAIL`
- `ADMIN_PASSWORD_HASH`
- `CLOUDINARY_CLOUD_NAME`
- `CLOUDINARY_API_KEY`
- `CLOUDINARY_API_SECRET`
- `CLIENT_URL`
- `PORT`

## Features

- Festive Ganpati-themed homepage
- Mobile-first responsive design
- Model-number-based product catalog
- Featured models and image gallery
- Search and filters for model, size, price, and availability
- WhatsApp order buttons with prefilled text
- Floating WhatsApp contact button
- Dark and light mode toggle
- Admin-only login and dashboard
- Add, edit, feature, and delete products
- Local file-backed product management fallback when MongoDB is not configured
- Cloudinary image uploads
- Cloudinary image uploads with local fallback when Cloudinary is not configured
- SEO-friendly metadata and custom 404 page

## Notes

- Products are identified only by model number.
- Customers do not purchase online.
- Replace the contact placeholders in `client/src/data/siteConfig.js` with the owner details before deployment.

## Deployment

See [DEPLOYMENT.md](DEPLOYMENT.md) for Vercel and Atlas deployment notes.
