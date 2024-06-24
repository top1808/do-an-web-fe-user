import { Spin } from 'antd';
import React, { useEffect, useState } from 'react';
import MRow from './MRow';
import MCol from './MCol';
import Link from 'next/link';
const recommendSearchs = ['iphone 14', 'iphone 13', 'iphone 12', 'iphone 11'];
const RecomendSearch = ({ value }: { value?: string }) => {
	const [loading, setLoading] = useState<boolean>(false);
	const [data, setData] = useState<string[]>(recommendSearchs);
	useEffect(() => {
		// call api recomended search
		// setLoading(false)
	}, [value]);
	return value ? (
		<MRow className=' bg-white rounded'>
			{loading && (
				<div className='flex justify-center items-center h-full bg-slate-50'>
					<Spin />
				</div>
			)}
			{!loading && (
				<>
					{data?.map((item) => (
						<MCol
							key={item}
							span={24}
							className='p-2 hover:bg-slate-200'
						>
							<Link
								href={'/search?search=' + item}
								className='w-full block'
							>
								{item}
							</Link>
						</MCol>
					))}
				</>
			)}
		</MRow>
	) : (
		<></>
	);
};

export default RecomendSearch;
