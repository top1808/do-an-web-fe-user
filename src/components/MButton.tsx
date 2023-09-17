import React, { ReactNode } from 'react';
import { Button, ButtonProps } from 'antd';

interface MButtonProps extends ButtonProps {
	children?: ReactNode;
}

const MButton: React.FC<MButtonProps> = (props) => {
	const { children, ...rest } = props;
	return <Button {...rest}>{children}</Button>;
};

export default MButton;
