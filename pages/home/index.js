import Head from 'next/head';
import { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useSession } from "next-auth/react";

import styles from './styles.module.scss';

import LoginPage from '@/pages/auth/login';
import { DateSlider } from '@/components/index';
import { SESSION_STATUS } from '@/constants/sessionStatus';
import { getUserDietListRequest, createDietList } from '@/services/diet';
import { getDietListSelector } from '@/store/selectors/dietListSelectors';

export default function HomePage() {
  const dispatch = useDispatch();
  const { data: session, status } = useSession();
  const dietList = useSelector(getDietListSelector.getData);

  useEffect(() => {
    if (session) {
      const data = {
        email: session?.user?.email,
      };
      dispatch(getUserDietListRequest({ data }));
    }
  }, [session, dispatch]);

  useEffect(() => {
    if (dietList && dietList.length > 0) {
      const date = new Date();
      const currentMonth = date.getMonth();
      const pastMonth = Number(dietList[0].date.split("-")[1]);
      if (currentMonth + 1 !== pastMonth) {
        const data = {
          email: session?.user?.email,
        };

        createDietList({ data })
          .then(() => {
            dispatch(getUserDietListRequest({ data: { email: data.email } }));
          })
          .catch(error => {
            toast(error.response.data.error);
          });
        dispatch(getUserDietListRequest({ data }));
      }
    }
  }, [dietList, dispatch, session.user.email]);

  const MainContent = () => (
    <div className={styles.mainContent}>
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
  );
}
