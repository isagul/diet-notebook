import { useEffect } from 'react';
import Head from 'next/head';
import { Button } from 'antd';
import { ToastContainer } from 'react-toastify';
import Link from "next/link";
import Image from "next/image";
import { useSession } from 'next-auth/react';
import Router from "next/router";

import { Header } from '@/components/index';
import useWindowSize from '@/hooks/useWindowSize';
import HomeImage from '@/public/home-image.png';
import styles from '@/styles/Home.module.css';

export default function Home() {  
  const size = useWindowSize();  
  const { data: session } = useSession();

  useEffect(() => {
    if (session) {
      Router.push("/home");
    }
  }, [session]);

  return (
    <div className={styles.container}>
      <Head>
        <title>Diyet Defteri</title>
        <meta name="description" content="Diet Notebook" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ToastContainer position="top-right" autoClose={2000} />
      <Header />
      <div className={styles.homeTextWrapper}>
        <div className={styles.homeLeftArea}>
          <h1>Online diyet defterin her zaman yanında.</h1>
          <p>Her pazartesi kesin kararlar alarak diyete başlayanlar için artık bu diyeti gerçekleştirmelerine yardımcı olacak online bir defter var.</p>
          <Link href="/auth/register">
            <Button>Kayıt Ol</Button>
          </Link>
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
