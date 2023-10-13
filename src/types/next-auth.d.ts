import NextAuth from 'next-auth';

declare module 'next-auth' {
	interface User {
		accessToken: string;
		_id: string;
	}
	interface Session {
		session: {
			accessToken: string;
		};
		user: {
			address: string;
			name: string;
			username: string;
			phoneNumber: string;
			birthday: string;
			email: string;
			image: string;
			id: string;
		};
		accessToken: any;
	}
}
