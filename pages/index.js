import Head from 'next/head';
import { Divider } from 'antd';
import { useSession } from "next-auth/react";

import { Header, DateSlider } from '@/components/index';
import LoginPage from '@/pages/auth/login';
import styles from '@/styles/Home.module.css';

export default function Home() {
  const { status } = useSession();

  const MainContent = () => (
    <div className={styles.mainContent}>
      <Header />
      <Divider />
      <DateSlider />
    </div>
  );

  return (
    <div className={styles.container}>
      <Head>
        <title>Diyet Defteri</title>
        <meta name="description" content="Diet Notebook" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {status === "authenticated" && (
        <MainContent />
      )}
      {status === "unauthenticated" && (
        <LoginPage />
      )}
    </div>
  )
}
