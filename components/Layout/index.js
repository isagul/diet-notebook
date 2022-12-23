import { Header } from '@/components/index';

import styles from './styles.module.scss';

export default function Layout({ children }) {
  return (
    <div className={styles.layoutComponent}>
      <Header />
      <main>{children}</main>
    </div>
  )
}