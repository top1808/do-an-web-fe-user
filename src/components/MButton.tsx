'use client';

import React, { ReactNode } from 'react';
import { Button, ButtonProps } from 'antd';
import { useRouter } from 'next/navigation';
import MTooltip from './MTooltip';

interface MButtonProps extends ButtonProps {
	children?: ReactNode;
	link?: string;
	title?: string;
}

const MButton: React.FC<MButtonProps> = (props) => {
	const router = useRouter();
	const { children, link, title, ...rest } = props;
	return (
		<MTooltip title={title}>
			<Button
				{...rest}
				onClick={link ? () => router.push(link) : rest.onClick}
			>
				{children}
			</Button>
		</MTooltip>
	);
};

export default MButton;
