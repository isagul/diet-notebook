// import { UserOutlined } from '@ant-design/icons';
import { signOut, useSession } from "next-auth/react";
import { Button } from "antd";
import Image from "next/image";

import SiteLogo from "public/siteLogo.png";

import styles from './styles.module.scss';

const Header = () => {
  const { data: session } = useSession();

  return (
    <header className={styles.header}>
      <div className={styles.logoWrapper}>
        <Image src={SiteLogo} alt="site-logo" height={50} width={50} />
        <h3 className={styles.title}>Diyet Defteri</h3>
      </div>
      <div className={styles.userInfoArea}>
        <span>Hoş geldin {session?.user?.name}!</span>
        <Button type="primary" danger onClick={() => signOut()}>Çıkış Yap</Button>
      </div>
    </header>
  );
};

export default Header;