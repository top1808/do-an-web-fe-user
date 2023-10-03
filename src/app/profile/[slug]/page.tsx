'use client';

import ProfileUserComponent from '@/features/profile/Index';
import ChangePass from '@/features/profile/components/ChangePass';
import Notice from '@/features/profile/components/Notice';
import Purchased from '@/features/profile/components/Purchased';
import { notFound, usePathname } from 'next/navigation';
import React from 'react';

const SlugProfileUser = () => {
	const path = usePathname();
	const currentPath = path.split('/')[2];
	switch (currentPath) {
		case 'notification':
			return (
				<ProfileUserComponent>
					<Notice data={[]} />
				</ProfileUserComponent>
			);
		case 'change-password':
			return (
				<ProfileUserComponent>
					<ChangePass />
				</ProfileUserComponent>
			);
		case 'purchased':
			return (
				<ProfileUserComponent>
					<Purchased />
				</ProfileUserComponent>
			);
		default:
			notFound();
	}
};

export default SlugProfileUser;
