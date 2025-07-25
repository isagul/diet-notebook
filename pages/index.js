import Head from 'next/head';
import { Button, Space } from 'antd';
import Link from 'next/link';
import Image from 'next/image';
import { useSession, getSession } from 'next-auth/react';

import { ROUTES } from '@/constants/routes';
import { SESSION_STATUS } from '@/constants/sessionStatus';
import useWindowSize from '@/hooks/useWindowSize';
import HomeImage from '@/public/home-image.png';
import styles from '@/styles/app-page.module.scss';

export default function Home() {
	const size = useWindowSize();
	const { status } = useSession();

	return (
		<div className={styles.container}>
			<Head>
				<title>Diyet Defterim</title>
				<meta name="description" content="Diet Notebook" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			{status === SESSION_STATUS.UNAUTHENTICATED && (
				<div className={styles.homeTextWrapper}>
					<div className={styles.homeLeftArea}>
						<h1>Online diyet defterin her zaman yanında.</h1>
						<p>
							Her pazartesi kesin kararlar alarak diyete başlayanlar için artık bu diyeti
							gerçekleştirmelerine yardımcı olacak online bir defter var.
						</p>
						<Space size="small">
							<Link href={ROUTES.LOGIN_PAGE}>
								<Button className={styles.btnLogin} data-cy="btn-home-login">
									Giriş Yap
								</Button>
							</Link>
							<Link href={ROUTES.REGISTER_PAGE}>
								<Button className={styles.btnRegister} data-cy="btn-home-register">
									Kayıt Ol
								</Button>
							</Link>
						</Space>
					</div>
					{size?.width > 475 && (
						<div className={styles.homeRightArea}>
							<Image src={HomeImage} alt="home-image" width={350} height={350} />
						</div>
					)}
				</div>
			)}
		</div>
	);
}

export async function getServerSideProps(context) {
	const session = await getSession(context);

	if (session) {
		return {
			redirect: {
				destination: ROUTES.HOME,
				permanent: false,
			},
		};
	}

	return {
		props: {
			session,
		},
	};
}
