import { useSession } from 'next-auth/react';
import { Spin } from 'antd';

import { Header } from '@/components/index';
import { SESSION_STATUS } from '@/constants/sessionStatus';

import styles from './styles.module.scss';

export default function Layout({ children }) {
  const { status } = useSession();

  if (status === SESSION_STATUS.LOADING) {
    return (<Spin />);
  };

  return (
    <div className={styles.layoutComponent}>
      <Header />
      <main>{children}</main>
    </div>
  )
}