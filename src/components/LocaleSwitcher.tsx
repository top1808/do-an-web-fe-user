'use client';

import { usePathname, useRouter } from '@/lib/i18nNavigation';
import { useLocale } from 'next-intl';
import Image from 'next/image';
import vi from '../../public/icons/vietnam.png';
import en from '../../public/icons/us.png';

export default function LocaleSwitcher() {
	const router = useRouter();
	const pathname = usePathname();
	const locale = useLocale();

	const handleChange = (value: string) => {
		router.push(pathname, { locale: value });
		router.refresh();
	};

	return (
		// <select
		// 	defaultValue={locale}
		// 	onChange={handleChange}
		// 	className='border border-gray-300 font-medium focus:outline-none focus-visible:ring'
		// >
		// 	{locales.map((elt) => (
		// 		<option
		// 			key={elt}
		// 			value={elt}
		// 		>
		// 			{elt.toUpperCase()}
		// 		</option>
		// 	))}
		// </select>
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
