import MButton from '@/components/MButton';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

const LoginLayout = async ({ children }: { children: React.ReactNode }) => {
	const session = await getServerSession();
	if (session?.user) redirect('/');
	return (
		<div className='h-screen w-screen overflow-hidden layout-login relative'>
			<div className='absolute md:top-6 md:left-6 top-0 left-0'>
				<MButton
					link='/'
					type='link'
					className='text-black font-bold'
				>
					<FontAwesomeIcon icon={faChevronLeft} />
					&nbsp; Back Home
				</MButton>
			</div>
			<div className='flex justify-center items-center h-full	'>{children}</div>
		</div>
	);
};

export default LoginLayout;
