import Head from 'next/head';
import { Divider } from 'antd';

import { Header, DateSlider, Meal } from '../components';
import styles from '../styles/Home.module.css';

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
      <Meal name="Kahvaltı" />
      <Meal name="Ara Öğün" />
      <Meal name="Öğle Yemeği" />
      <Meal name="Ara Öğün 1" />
      <Meal name="Ara Öğün 2" />
      <Meal name="Akşam Yemeği" />
      {/* <main className={styles.main}>
        <p>hello world!</p>
      </main>

      <footer className={styles.footer}>
       
      </footer> */}
    </div>
  )
}
