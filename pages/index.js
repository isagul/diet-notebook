import Head from 'next/head';
import { Divider } from 'antd';

import { Header, DateSlider } from '@/components/index';
import styles from '@/styles/Home.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Diyet Defteri</title>
        <meta name="description" content="Diet Notebook" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <Divider />
      <DateSlider />
      {/* <main className={styles.main}>
        <p>hello world!</p>
      </main>

       */}
       {/* <footer className={styles.footer}></footer> */}
    </div>
  )
}
