'use client';
import MImage from '@/components/MImage';
import { Category } from '@/models/categoryModels';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { Menu, type MenuProps } from 'antd';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import iconAll from '../../public/icons/all.png';
import { getCategoryState, gettingCategory } from '@/redux/reducers/categoryReducer';
import Link from 'next/link';
import MRow from '@/components/MRow';
import MCol from '@/components/MCol';
import { getItem } from '@/utils/FunctionHelpers';
import { useTranslations } from 'next-intl';

type MenuItem = Required<MenuProps>['items'][number];

const SideBarUser: React.FC = () => {
	const dispatch = useAppDispatch();
	const category = useAppSelector(getCategoryState);
	const t = useTranslations('Category');
	const searchParams = useSearchParams();
	const [sizeDevice, setSizeDevice] = useState(document.documentElement.clientWidth);
	window.onresize = () => setSizeDevice(window.innerWidth);
	const items: MenuItem[] =
		category.data?.map((item: Category) =>
			getItem(
				<Link
					href={'/product?category=' + item._id}
					className='flex gap-2 align-middle'
				>
					<MImage
						width={sizeDevice > 576 ? 30 : 20}
						height={sizeDevice > 576 ? 30 : 20}
						src={item?.image}
						preview={false}
					/>
					{t(item.name)}
				</Link>,
				item._id,
			),
		) || [];

	useEffect(() => {
		dispatch(gettingCategory());
	}, [dispatch]);

	return (
		<>
			<MRow gutter={[16, 16]}>
				<MCol
					span={24}
					className='hidden lg:block'
				>
					<Menu
						style={{ borderInlineEnd: 'none', padding: '10px' }}
						className='rounded-md font-semibold'
						// overflowedIndicator={<p className='font-bold'>Xem thêm...</p>}
						items={[
							getItem(
								<Link
									href={'/product?category=all'}
									className='flex gap-2 align-middle'
								>
									<MImage
										width={sizeDevice > 576 ? 30 : 20}
										height={sizeDevice > 576 ? 30 : 20}
										src={iconAll.src}
										preview={false}
									/>
									{t('Tất cả')}
								</Link>,
								'all',
							),
							...items,
						]}
						selectedKeys={[searchParams?.get('category') || 'all']}
					/>
				</MCol>
				<MCol
					span={24}
					className='block lg:hidden'
				>
					<Menu
						style={{ width: '100%' }}
						mode='inline'
						items={[
							getItem(<p>Danh mục</p>, 'category', <></>, [
								getItem(
									<Link
										href={'/product?category=all'}
										className='flex gap-2 align-middle'
									>
										<MImage
											width={sizeDevice > 576 ? 30 : 20}
											height={sizeDevice > 576 ? 30 : 20}
											src={iconAll.src}
											preview={false}
										/>
										ALL
									</Link>,
									'all',
								),
								...items,
							]),
						]}
					/>
				</MCol>
			</MRow>
		</>
	);
};

export default SideBarUser;
