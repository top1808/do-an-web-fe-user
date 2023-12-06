import ProfileUserComponent from '@/features/profile/Index';

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return <ProfileUserComponent>{children}</ProfileUserComponent>;
}
