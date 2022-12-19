import Head from 'next/head';
import { useEffect } from 'react';
import { useDispatch } from "react-redux";
import { useSession } from "next-auth/react";

import LoginPage from '@/pages/auth/login';
import { getUserDietList } from '@/services/diet';
import { Header, DateSlider } from '@/components/index';
import { setDietList } from '@/store/slices/dietListSlice';

import styles from './styles.module.scss';

const SESSION_STATUS = {
  AUTHENTICATED: "authenticated",
  UNAUTHENTICATED: "unauthenticated",
};

export default function HomePage() {
  const dispatch = useDispatch();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (session) {
      const data = {
        email: session?.user?.email,
      };

      getUserDietList({ data })
        .then(response => {
          const { dietList } = response
          dispatch(setDietList(dietList));
        })
        .catch(error => {
          console.log('error :>> ', error);
        })
    }
  }, [session, dispatch])

  const MainContent = () => (
    <div className={styles.mainContent}>
      <Header />
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
      {status === SESSION_STATUS.AUTHENTICATED && (
        <MainContent />
      )}
      {status === SESSION_STATUS.UNAUTHENTICATED && (
        <LoginPage />
      )}
    </div>
  )
}
