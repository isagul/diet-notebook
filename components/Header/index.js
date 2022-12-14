// import { UserOutlined } from '@ant-design/icons';
import { signOut, useSession } from "next-auth/react";
import { Button } from "antd";

import styles from './styles.module.scss';

const Header = () => {
  const { data: session } = useSession();

  return (
    <header className={styles.header}>
      <h3 className={styles.title}>Diyet Defteri</h3>
      <div className={styles.userInfoArea}>
        <span>Hoş geldin {session?.user?.name}!</span>
        <Button onClick={() => signOut()}>Sign Out</Button>
      </div>
    </header>
  );
};

export default Header;