import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import Footer from './Footer';
import MRow from '@/components/MRow';
import MCol from '@/components/MCol';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHatCowboy } from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image';
import bannerLogin from '../../public/images/login.png';
import LocaleSwitcher from '@/components/LocaleSwitcher';
const LoginLayout = async ({ children }: { children: React.ReactNode }) => {
	const session = await getServerSession();
	if (session?.user) redirect('/');
	return (
		<>
			<header className='py-8 md:px-8 xl:px-32 relative'>
				<MRow
					justify={'start'}
					className='w-full'
					gutter={[16, 16]}
					align={'middle'}
				>
					<MCol
						xs={2}
						md={4}
					>
						<Link
							href={'/'}
							className='text-xl md:text-4xl font-bold flex items-center text-gradien text-[#FA5130] hover:opacity-80  justify-center h-full'
						>
							<FontAwesomeIcon icon={faHatCowboy} />
							<span className='hidden md:block'>T&T</span>
						</Link>
					</MCol>
					<MCol>
						<h2 className=' text-2xl font-semibold'>Login</h2>
					</MCol>
				</MRow>
				<div className='absolute top-2 right-2'>
					<LocaleSwitcher />
				</div>
			</header>
			<div className='flex justify-center items-center h-full py-8 bg-[#D0011B]'>
				<div>
					<Image
						src={bannerLogin}
						alt='banner-login'
					/>
				</div>
				{children}
			</div>
			<Footer />
		</>
	);
};

export default LoginLayout;
