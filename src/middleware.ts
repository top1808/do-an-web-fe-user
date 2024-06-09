import { withAuth } from 'next-auth/middleware';
import createIntlMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
const locales = ['vi', 'en'];
const publicPages = ['/', '/login', '/register', '/product/[productId]', '/search', '/product', '/verify-email'];
const authPages = ['/login', '/register'];
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
	const pathname = req.nextUrl.pathname;
	const token = req.cookies.get('next-auth.session-token')?.value;

	const publicPathnameRegex = RegExp(`^(/(${locales.join('|')}))?(${publicPages.flatMap((p) => (p === '/' ? ['', '/'] : p.replace(/\[(\w+)\]/g, '[^/]+'))).join('|')})/?$`, 'i');
	const isPublicPage = publicPathnameRegex.test(req.nextUrl.pathname);
	if (isPublicPage) {
		if (token && authPages.some((page) => pathname.includes(page))) {
			const pathRedirect = `/${req.cookies.get('NEXT_LOCALE')?.value}`;
			return NextResponse.redirect(new URL(pathRedirect, req.url));
		}
		return intlMiddleware(req);
	} else {
		return (authMiddleware as any)(req);
	}
}

export const config = {
	matcher: ['/((?!api|_next|.*\\..*).*)'],
};
