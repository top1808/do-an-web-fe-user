import '../styles/globals.css';
import StyledComponentsRegistry from '../lib/AntdRegistry';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { config } from '@fortawesome/fontawesome-svg-core';
import 'sweetalert2/src/sweetalert2.scss';
config.autoAddCss = false;
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { Inter } from 'next/font/google';
import { Providers } from '@/redux/provider';
import NextTopLoader from 'nextjs-toploader';

const inter = Inter({ subsets: ['latin'] });

export default async function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang='en'>
			<body className={inter.className}>
				<StyledComponentsRegistry>
					<Providers>
						<NextTopLoader />
						<main>{children}</main>
						<ToastContainer />
					</Providers>
				</StyledComponentsRegistry>
			</body>
		</html>
	);
}
