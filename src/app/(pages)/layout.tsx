import MLayoutUser from '@/layout/MLayout';

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return <MLayoutUser>{children}</MLayoutUser>;
}
