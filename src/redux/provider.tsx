'use client';

import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from './store';
import { Provider } from 'react-redux';
import { SessionProvider } from 'next-auth/react';
import NextNProgress from 'nextjs-progressbar';

export function Providers({ children }: { children: React.ReactNode }) {
	return (
		<Provider store={store}>
			<PersistGate
				loading={null}
				persistor={persistor}
			>
				<SessionProvider>
					<NextNProgress />
					{children}
				</SessionProvider>
			</PersistGate>
		</Provider>
	);
}
