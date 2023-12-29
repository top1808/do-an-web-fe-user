This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started
First, you have to install module: npm install. <br />
Second, you create file ".env.local" in root directory with content:
```bash
NEXT_PUBLIC_API_URL="http://localhost:8000/v2/"
NEXT_PUBLIC_API_UPLOAD_URL=http://localhost:8000/
NEXT_PUBLIC_NEXTAUTH_URL="http://localhost:3000"
NEXT_PUBLIC_NEXTAUTH_SECRET="agtj7Cja2ebjUI+l9O9EC1l7WOFaZ4fHEegCs/ZueuA="
NEXT_PUBLIC_GOOGLE_CLIENT_ID="382501836000-n085r1to6avp0dqgposmuuckerdtd959.apps.googleusercontent.com"
NEXT_PUBLIC_GOOGLE_CLIENT_SECRET="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"
NEXT_PUBLIC_FACEBOOK_CLIENT_ID="870179401286660"
NEXT_PUBLIC_FACEBOOK_CLIENT_SECRET="3356bc21b1616c47ed1d7e3000e36464"
```
Third, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
