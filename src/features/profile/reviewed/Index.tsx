'use client';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { getReviewState, gettingReviews } from '@/redux/reducers/reviewReducers';
import React, { useEffect } from 'react';

const ReviewsComponent = () => {
	const dispatch = useAppDispatch();
	const reviewState = useAppSelector(getReviewState);
	console.log(reviewState.data);

	useEffect(() => {
		dispatch(gettingReviews());
	}, [dispatch]);
	return <div></div>;
};

export default ReviewsComponent;
