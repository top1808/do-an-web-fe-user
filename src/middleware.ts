import { withAuth } from 'next-auth/middleware';
import createIntlMiddleware from 'next-intl/middleware';
import { NextRequest } from 'next/server';

const locales = ['vi', 'en'];
const publicPages = ['/', '/login'];

const intlMiddleware = createIntlMiddleware({
	locales,
	localePrefix: 'as-needed',
	defaultLocale: 'en',
});

const authMiddleware = withAuth(
	function onSuccess(req) {
		return intlMiddleware(req);
	},
	{
		callbacks: {
			// eslint-disable-next-line eqeqeq
			authorized: ({ token }) => token != null,
		},
		pages: {
			signIn: '/login',
		},
	},
);

export default function middleware(req: NextRequest) {
	const publicPathnameRegex = RegExp(`^(/(${locales.join('|')}))?(${publicPages.flatMap((p) => (p === '/' ? ['', '/'] : p)).join('|')})/?$`, 'i');
	const isPublicPage = publicPathnameRegex.test(req.nextUrl.pathname);
	if (isPublicPage) {
		return intlMiddleware(req);
	} else {
		return (authMiddleware as any)(req);
	}
}

export const config = {
	matcher: ['/((?!api|_next|.*\\..*).*)'],
};
