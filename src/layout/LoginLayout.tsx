import Footer from './Footer';
import MRow from '@/components/MRow';
import MCol from '@/components/MCol';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHatCowboy } from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image';
import bannerLogin from '../../public/images/clothing-fashion-dress-shop-woman-women-pick-dresses-on-hangers-564e9ed1fd8c58e2724680210d3b87c9.png';
import LocaleSwitcher from '@/components/LocaleSwitcher';
const LoginLayout = async ({ children }: { children: React.ReactNode }) => {
	return (
		<>
			<header className=' w-full  relative bg-[#FA5130] py-8'>
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
							className='text-xl md:text-4xl font-bold flex items-center text-gradien text-white hover:opacity-80  justify-center h-full'
						>
							<FontAwesomeIcon icon={faHatCowboy} />
							<span className='hidden md:block'>T&T</span>
						</Link>
					</MCol>
				</MRow>
				<div className='absolute top-2 right-2'>
					<LocaleSwitcher />
				</div>
			</header>
			<div className='flex justify-center items-center h-full py-8 bg-[#F8F1E4]'>
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
