'use client';

import { usePathname, useRouter } from '@/lib/i18nNavigation';
import Image from 'next/image';
import vi from '../../public/icons/vietnam.png';
import en from '../../public/icons/us.png';
import { useSearchParams } from 'next/navigation';

export default function LocaleSwitcher() {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const handleChange = (value: string) => {
		router.push(pathname + '?' + searchParams.toString(), { locale: value });
		router.refresh();
	};

	return (
		<div className='flex gap-4'>
			<Image
				className='cursor-pointer'
				src={vi}
				alt='vietnamese'
				height={32}
				onClick={() => handleChange('vi')}
			/>
			<Image
				className='cursor-pointer'
				src={en}
				alt='vietnamese'
				height={32}
				onClick={() => handleChange('en')}
			/>
		</div>
	);
}
