import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import FacebookProvider from 'next-auth/providers/facebook';
import CredentialsProvider from 'next-auth/providers/credentials';
import { FormLogin } from '@/models/authModel';
import authApi from '@/api/authApi';
import { AxiosError, AxiosResponse } from 'axios';
import { User } from '@/models/userModel';

const handler = NextAuth({
	secret: process.env.NEXTAUTH_SECRET,
	session: {
		strategy: 'jwt',
	},
	providers: [
		CredentialsProvider({
			name: 'Credentials',
			credentials: {},
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore
			async authorize(credentials) {
				try {
					const res: AxiosResponse<{ message: string }> = await authApi.login(credentials as FormLogin);
					if (res.status === 200 && res.data) {
						return res.data;
					}
					return null;
				} catch (error) {
					const err = error as AxiosError<{ message: string }>;
					throw new Error(err?.response?.data.message);
				}
			},
		}),
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID || '',
			clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
		}),
		FacebookProvider({
			clientId: process.env.FACEBOOK_CLIENT_ID!,
			clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
		}),
	],
	callbacks: {
		async signIn({ user, account, credentials }) {
			if (account && (account.provider === 'google' || account.provider === 'facebook')) {
				const res: AxiosResponse<{ customer: User }> = await authApi.checkExist(user.id);
				if (res.data?.customer) return true;
				await authApi.register({
					id: user?.id || '',
					email: user?.email || '',
					name: user?.name || '',
					image: user?.image || '',
				});
			}
			return true;
		},
		async redirect({ url, baseUrl }) {
			return baseUrl;
		},
		async jwt({ token, user, account, profile }) {
			if (account) {
				token.accessToken = account.access_token;
			}
			if (user) {
				token.id = user.id;
				if (user.accessToken) {
					token.accessToken = user.accessToken;
				}
			}

			return token;
		},
		async session({ session, token, user }) {
			session.user.id = token.id as string;
			session.accessToken = token.accessToken;
			return session;
		},
	},
	pages: {
		signIn: '/login',
		error: '/login',
	},
});

export { handler as GET, handler as POST };
