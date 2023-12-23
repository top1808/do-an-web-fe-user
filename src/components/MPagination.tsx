import React from 'react';
import { Pagination, PaginationProps } from 'antd';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

interface MPaginationProps extends PaginationProps {}

const MPagination: React.FC<MPaginationProps> = (props) => {
	const { ...rest } = props;

	const itemRender: PaginationProps['itemRender'] = (item, type) => {
		if (type === 'prev') {
			return (
				<Link href={'#'}>
					<FontAwesomeIcon icon={faChevronLeft} />
				</Link>
			);
		}
		if (type === 'next') {
			return (
				<Link href={'#'}>
					<FontAwesomeIcon icon={faChevronRight} />
				</Link>
			);
		}
		return <Link href={'#'}>{item}</Link>;
	};
	return (
		<Pagination
			itemRender={itemRender}
			{...rest}
		/>
	);
};

export default MPagination;
