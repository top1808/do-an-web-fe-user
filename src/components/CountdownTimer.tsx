'use client';
import dayjs from 'dayjs';
import { useState, useEffect } from 'react';

interface CountdownProps {
	startTime: string;
	endTime: string;
	children: React.ReactNode;
}

const CountdownTimer: React.FC<CountdownProps> = ({ startTime, endTime, children }) => {
	const [counter, setCounter] = useState('0');
	const today = dayjs();
	const start = dayjs(startTime);
	const end = dayjs(endTime);
	const differenceStart = start.diff(today, 'day');
	const differenceEnd = end.diff(today, 'day');
	useEffect(() => {
		const intervalId = setInterval(() => {
			const today = new Date();
			const endDate = new Date(endTime);
			const differenceInMs = endDate.getTime() - today.getTime();
			const safeDifference = Math.max(differenceInMs, 0);
			const seconds = Math.floor(safeDifference / 1000) % 60;
			const formattedSeconds = seconds.toString().padStart(2, '0');
			const minutes = Math.floor(safeDifference / (1000 * 60)) % 60;
			const formattedMinutes = minutes.toString().padStart(2, '0');
			const hours = Math.floor((safeDifference / (1000 * 60 * 60)) % 24);
			const formatHours = hours.toString().padStart(2, '0');
			const days = Math.floor(safeDifference / (1000 * 60 * 60 * 24));
			const formatDay = days.toString().padStart(2, '0');
			setCounter(`${formatDay} ngày ${formatHours}:${formattedMinutes}:${formattedSeconds}`);
		}, 1000);
		return () => clearInterval(intervalId);
	}, [startTime, endTime]);

	return (
		<>
			{differenceStart < 0 && differenceEnd > 0 && (
				<>
					<div className='py-2'>
						<p className='text-red-600 text-xl font-bold'>Đang diễn ra trong {counter}</p>
					</div>
					{children}
				</>
			)}
		</>
	);
};

export default CountdownTimer;
