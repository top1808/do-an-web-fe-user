import React, { ReactNode } from 'react';
import { Tooltip } from 'antd';
import { TooltipPropsWithTitle } from 'antd/es/tooltip';

interface MTooltipProps extends TooltipPropsWithTitle {
	children?: ReactNode;
}

const MTooltip: React.FC<MTooltipProps> = (props) => {
	const { children, ...rest } = props;
	return <Tooltip {...rest}>{children}</Tooltip>;
};

export default MTooltip;
