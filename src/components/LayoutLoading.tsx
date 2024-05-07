import React from 'react';
import Loading from './Loading';

const LayoutLoading = ({ children, isLoading }: { children: React.ReactNode; isLoading: boolean }) => {
	return <div>{isLoading ? <Loading /> : children}</div>;
};

export default LayoutLoading;
