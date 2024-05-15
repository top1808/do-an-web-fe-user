import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { InputNumber, InputNumberProps } from 'antd';
import React from 'react';

interface MInputQuantityProps extends InputNumberProps {
	onClickPlus: React.MouseEventHandler<SVGSVGElement>;
	onClickMinus: React.MouseEventHandler<SVGSVGElement>;
}

const MInputQuantity = (props: MInputQuantityProps) => {
	const { onClickMinus, onClickPlus, disabled, max, ...rest } = props;

	return (
		<div className='flex align-middle select-none'>
			<FontAwesomeIcon
				className='p-2 bg-blue-400 transition-colors hover:bg-blue-300 cursor-pointer text-white'
				icon={faMinus}
				onClick={disabled ? () => {} : onClickMinus}
			/>
			<InputNumber
				className='w-11 rounded-none'
				min={1}
				max={max}
				maxLength={10}
				style={{ height: 30 }}
				inputMode='numeric'
				disabled={disabled}
				{...rest}
			/>
			<FontAwesomeIcon
				className='p-2 bg-blue-400 transition-colors hover:bg-blue-300 text-white cursor-pointer '
				icon={faPlus}
				onClick={disabled ? () => {} : onClickPlus}
			/>
		</div>
	);
};

export default MInputQuantity;
