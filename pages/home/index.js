import Head from 'next/head';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSession } from 'next-auth/react';

import styles from './styles.module.scss';

import LoginPage from '@/pages/auth/login';
import { DateSlider } from '@/components/index';
import { SESSION_STATUS } from '@/constants/sessionStatus';
import { getUserDietListRequest } from '@/services/diet';

export default function HomePage({ session }) {
	const dispatch = useDispatch();
	const { data: session, status } = useSession();

	useEffect(() => {
		if (session) {
			const data = {
				email: session?.user?.email,
			};
			dispatch(getUserDietListRequest({ data }));
		}
	}, [dispatch, session]);

	const MainContent = () => (
		<div className={styles.mainContent}>
			<DateSlider />
		</div>
	);

	return (
		<div className={styles.container}>
			<Head>
				<title>Diyet Defterim</title>
				<meta name="description" content="Diet Notebook" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			{status === SESSION_STATUS.AUTHENTICATED && <MainContent />}
			{status === SESSION_STATUS.UNAUTHENTICATED && <LoginPage />}
		</div>
	);
}
