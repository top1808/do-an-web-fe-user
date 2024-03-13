/** @type {import('next').NextConfig} */
const nextConfig = {
	env: {
		API_URL: process.env.NEXT_PUBLIC_API_URL,
		NEXTAUTH_URL: process.env.NEXT_PUBLIC_NEXTAUTH_URL,
		NEXTAUTH_SECRET: process.env.NEXT_PUBLIC_NEXTAUTH_SECRET,
		GOOGLE_CLIENT_ID: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
		GOOGLE_CLIENT_SECRET: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET,
		FACEBOOK_CLIENT_ID: process.env.NEXT_PUBLIC_FACEBOOK_CLIENT_ID,
		FACEBOOK_CLIENT_SECRET: process.env.NEXT_PUBLIC_FACEBOOK_CLIENT_SECRET,
		API_UPLOAD_URL: process.env.NEXT_PUBLIC_API_UPLOAD_URL,
		FIREBASE_VAPID_KEY: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY,
		FIREBASE_API_KEY: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
		PUSHER_KEY: process.env.NEXT_PUBLIC_PUSHER_KEY,
	},
};

module.exports = nextConfig;
