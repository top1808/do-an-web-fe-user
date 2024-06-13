import Footer from './Footer';
import MRow from '@/components/MRow';
import MCol from '@/components/MCol';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHatCowboy } from '@fortawesome/free-solid-svg-icons';
import LocaleSwitcher from '@/components/LocaleSwitcher';
const LoginLayout = async ({ children }: { children: React.ReactNode }) => {
	return (
		<>
			<header className=' w-full  relative bg-whitepy-8 py-4'>
				<MRow
					justify={'start'}
					className='w-full'
					align={'middle'}
				>
					<MCol span={4}>
						<Link
							href={'/'}
							className='text-xl md:text-4xl font-bold flex items-center text-gradien text-[#FA5130] hover:opacity-80  justify-center h-full'
						>
							<FontAwesomeIcon
								icon={faHatCowboy}
								size='2xl'
							/>
							<span className='hidden md:block'>T&T</span>
						</Link>
					</MCol>
				</MRow>
				<div className='absolute top-2 right-2'>
					<LocaleSwitcher />
				</div>
			</header>
			<div className='flex justify-center items-center gap-16 h-full py-8 bg-[#FA5130]'>
				<div className='hidden sm:block text-center'>
					<FontAwesomeIcon
						icon={faHatCowboy}
						size='9x'
						color='white'
					/>
					<p className='text-white text-5xl text-center font-bold'>T&T</p>
					<div className='w-[400px]'>
						<p className='text-white text-2xl text-center font-semibold row-span-2'>Nền tảng thương mại yêu thích nhất Đông Nam Á</p>
					</div>
				</div>
				{children}
			</div>
			<Footer />
		</>
	);
};

export default LoginLayout;
