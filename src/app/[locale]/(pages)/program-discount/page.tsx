import { fetchServer } from '@/api/fetchServer';
import DiscountProgramComponent from '@/features/program-discount/Index';
import { objectToQueryString } from '@/utils/FunctionHelpers';
import React from 'react';

async function getDiscountProgram(searchParams: { offset: string; limit: string }) {
	const query = objectToQueryString<any>({
		offset: searchParams.offset ?? '',
		limit: searchParams.limit ?? '',
	});
	const res = await fetchServer(`/discount-program/get-all`);
	const response = await res.json();
	return response;
}

const page = async ({ params, searchParams }: { params: null; searchParams: { offset: string; limit: string } }) => {
	const res = await getDiscountProgram(searchParams);
	return (
		<div>
			<DiscountProgramComponent
				products={res?.discountPrograms || []}
				pagination={{ offset: 0, limit: 10 }}
			/>
		</div>
	);
};

export default page;
