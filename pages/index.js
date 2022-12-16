import { useEffect } from 'react';
import Head from 'next/head';
import { Divider } from 'antd';
import { useSession } from "next-auth/react";
import { ToastContainer } from 'react-toastify';
import { useDispatch } from "react-redux";

import { getUserDietList } from '@/services/diet';
import { setDietList } from '@/store/slices/dietListSlice';
import { Header, DateSlider } from '@/components/index';
import LoginPage from '@/pages/auth/login';
import styles from '@/styles/Home.module.css';

const SESSION_STATUS = {
  AUTHENTICATED: "authenticated",
  UNAUTHENTICATED: "unauthenticated",
};

export default function Home() {
  const { status } = useSession();
  const dispatch = useDispatch();
  const { data: session } = useSession();  

  useEffect(() => {
    if (session ) {
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
      <ToastContainer position="top-right" autoClose={2000} />
      {status === SESSION_STATUS.AUTHENTICATED && (
        <MainContent />
      )}
      {status === SESSION_STATUS.UNAUTHENTICATED && (
        <LoginPage />
      )}
    </div>
  )
}
