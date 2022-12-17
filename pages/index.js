import { useEffect } from 'react';
import Head from 'next/head';
import { Button, Space } from 'antd';
import Link from "next/link";
import Image from "next/image";
import { useSession } from 'next-auth/react';
import Router from "next/router";

import { ROUTES } from '@/constants/routes';
import { Header } from '@/components/index';
import useWindowSize from '@/hooks/useWindowSize';
import HomeImage from '@/public/home-image.png';
import styles from '@/styles/app-page.module.scss';

export default function Home() {
  const size = useWindowSize();
  const { data: session } = useSession();

  useEffect(() => {
    if (session) {
      Router.push(ROUTES.HOME);
    }
  }, [session]);

  return (
    <div className={styles.container}>
      <Head>
        <title>Diyet Defteri</title>
        <meta name="description" content="Diet Notebook" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <div className={styles.homeTextWrapper}>
        <div className={styles.homeLeftArea}>
          <h1>Online diyet defterin her zaman yanında.</h1>
          <p>Her pazartesi kesin kararlar alarak diyete başlayanlar için artık bu diyeti gerçekleştirmelerine yardımcı olacak online bir defter var.</p>
          <Space size="small">
            <Link href={ROUTES.LOGIN_PAGE}>
              <Button className={styles.btnLogin}>Giriş Yap</Button>
            </Link>
            <Link href={ROUTES.REGISTER_PAGE}>
              <Button className={styles.btnRegister}>Kayıt Ol</Button>
            </Link>
          </Space>
        </div>
        {size?.width > 475 && (
          <div className={styles.homeRightArea}>
            <Image src={HomeImage} alt="home-image" width={350} height={350} />
          </div>
        )}
      </div>
    </div>
  )
}
