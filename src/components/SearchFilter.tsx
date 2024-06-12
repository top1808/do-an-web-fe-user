'use client';
import React, { useCallback, useState } from 'react';
import MTitle from './MTitle';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faFilter } from '@fortawesome/free-solid-svg-icons';
import MRow from './MRow';
import MCol from './MCol';
import Checkbox, { CheckboxChangeEvent } from 'antd/es/checkbox';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { InputNumber, Menu, Rate } from 'antd';
import MSelect from './MSelect';
import { MenuItem } from '@/models/productModels';
import MButton from './MButton';
import MInput from './MInput';
type RangePrice = {
	minPrice?: number | null;
	maxPrice?: number | null;
};
const SearchFilter = () => {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const [rangePrice, setRangePrice] = useState<RangePrice>({});
	const items: MenuItem[] = [
		{
			key: '5',
			label: (
				<Rate
					disabled
					defaultValue={5}
				/>
			),
		},
		{
			key: '4',
			label: (
				<div className='flex gap-4'>
					<Rate
						disabled
						defaultValue={4}
					/>
					<p>& Up</p>
				</div>
			),
		},
		{
			key: '3',
			label: (
				<div className='flex gap-4'>
					<Rate
						disabled
						defaultValue={3}
					/>
					<p>& Up</p>
				</div>
			),
		},
		{
			key: '2',
			label: (
				<div className='flex gap-4'>
					<Rate
						disabled
						defaultValue={2}
					/>
					<p>& Up</p>
				</div>
			),
		},
		{
			key: '1',
			label: (
				<div className='flex gap-4'>
					<Rate
						disabled
						defaultValue={1}
					/>
					<p>& Up</p>
				</div>
			),
		},
	];
	const createQueryString = useCallback(
		(name: string, value?: string) => {
			const params = new URLSearchParams(searchParams.toString());
			if (value) {
				if (name === 'sortType') {
					params.set('sortBy', 'price');
				}
				params.set(name, value);
			} else {
				if (name === 'sortType') {
					params.delete('sortBy');
				}
				params.delete(name);
			}
			return params.toString();
		},
		[searchParams],
	);
	const clearQueryString = useCallback(() => {
		const params = new URLSearchParams(searchParams.toString());
		const newParams = new URLSearchParams();
		if (params.get('category')) {
			newParams.set('category', params.get('category')!);
		}
		if (params.get('search')) {
			newParams.set('search', params.get('search')!);
		}
		return newParams.toString();
	}, [searchParams]);
	const handleOnChangeFilterPromotion = (value: string, e: CheckboxChangeEvent) => {
		if (e.target.checked) {
			// add query
			router.push(pathname + '?' + createQueryString(value, 'true'));
		} else {
			// remove query
			router.push(pathname + '?' + createQueryString(value, ''));
		}
	};
	const handleApplyRangePrice = () => {
		const params = new URLSearchParams(searchParams.toString());
		rangePrice.minPrice ? params.set('minPrice', rangePrice.minPrice + '') : params.delete('minPrice');
		rangePrice.maxPrice ? params.set('maxPrice', rangePrice.maxPrice + '') : params.delete('maxPrice');
		router.push(pathname + '?' + params.toString());
	};
	return (
		<div className='bg-white shadow-md p-2 rounded-lg'>
			<MTitle level={4}>
				<FontAwesomeIcon
					icon={faFilter}
					className='mr-2'
				/>
				SEARCH FILTER
			</MTitle>
			<MRow
				gutter={[16, 16]}
				className='p-2'
			>
				{/* <MCol span={24}>
					<MRow gutter={[8, 8]}>
						<h3>Promotion</h3>
						<MCol span={24}>
							<Checkbox
								checked={searchParams.get('onSale') === 'true'}
								onChange={(e) => handleOnChangeFilterPromotion('onSale', e)}
							>
								On sale
							</Checkbox>
						</MCol>
						<MCol span={24}>
							<Checkbox
								checked={searchParams.get('freeShip') === 'true'}
								onChange={(e) => handleOnChangeFilterPromotion('freeShip', e)}
							>
								Free ship
							</Checkbox>
						</MCol>
					</MRow>
				</MCol> */}
				<MCol span={24}>
					<MRow gutter={[8, 8]}>
						<h3>Price</h3>
						<MCol span={24}>
							<MSelect
								value={searchParams.get('sortType') ?? 'default'}
								style={{ width: 150 }}
								onChange={(value) => {
									router.push(pathname + '?' + createQueryString('sortType', value));
								}}
								options={[
									{ value: '', label: '(Default)' },
									{ value: 'asc', label: 'Giá tăng dần' },
									{ value: 'desc', label: 'Giá giảm dần' },
								]}
							/>
						</MCol>
						<h3>Price Range</h3>
						<MCol span={24}>
							<MRow
								justify={'space-between'}
								align={'middle'}
								gutter={[0, 4]}
							>
								<MCol span={11}>
									<InputNumber
										className='w-full'
										value={rangePrice.minPrice}
										onChange={(value) => setRangePrice((prev) => ({ ...prev, minPrice: value }))}
										min={0}
										placeholder='Min price'
										controls={false}
									/>
								</MCol>
								<MCol span={1}>
									<FontAwesomeIcon icon={faArrowRight} />
								</MCol>
								<MCol span={11}>
									<InputNumber
										className='w-full'
										value={rangePrice.maxPrice}
										onChange={(value) => setRangePrice((prev) => ({ ...prev, maxPrice: value }))}
										min={0}
										placeholder='Max price'
										controls={false}
									/>
								</MCol>
								<MCol span={24}>
									<MButton
										className='w-full bg-red-600 text-white'
										onClick={handleApplyRangePrice}
									>
										Apply
									</MButton>
								</MCol>
							</MRow>
						</MCol>
					</MRow>
				</MCol>
				<MCol span={24}>
					<MRow gutter={[8, 8]}>
						<h3>Rating</h3>
						<MCol span={24}>
							<Menu
								onClick={(e) => {
									router.push(pathname + '?' + createQueryString('rate', e.key));
								}}
								style={{ width: '100%' }}
								mode='inline'
								items={items}
								selectedKeys={searchParams.getAll('rate') ?? []}
							/>
						</MCol>
					</MRow>
				</MCol>
				<MCol span={24}>
					<MRow>
						<MButton
							type='primary'
							className='w-full text-white bg-red-500 '
							onClick={() => router.push(pathname + '?' + clearQueryString())}
						>
							CLEAR ALL
						</MButton>
					</MRow>
				</MCol>
			</MRow>
		</div>
	);
};
export default SearchFilter;
