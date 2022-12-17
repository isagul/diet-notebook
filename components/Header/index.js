// import { UserOutlined } from '@ant-design/icons';
import { signOut, useSession } from "next-auth/react";
import { Button, Dropdown, Space, Typography } from "antd";
import Image from "next/image";
import Link from "next/link";
import { DownOutlined, LogoutOutlined } from "@ant-design/icons";

import SiteLogo from "public/siteLogo.png";

import styles from './styles.module.scss';

const { Text } = Typography;

const Header = () => {
  const { data: session } = useSession();

  const dropdownMenuItems = [
    {
      key: '1',
      label: (
        <Text onClick={() => signOut()}>Çıkış Yap</Text>
      ),
      icon: <LogoutOutlined />,
    }
  ]

  const UserDropdown = () => {
    return (
      <Dropdown menu={{ items: dropdownMenuItems }}>
        <Button>
          <Space>
            {session?.user?.name} <DownOutlined />
          </Space>
        </Button>
      </Dropdown>
    )
  }

  return (
    <header className={styles.header}>
      <Link href="/">
        <div className={styles.logoWrapper}>
          <Image src={SiteLogo} alt="site-logo" height={50} width={50} />
          <h3 className={styles.title}>Diyet Defteri</h3>
        </div>
      </Link>

      {
        session && (
          <UserDropdown />
        )
      }

    </header>
  );
};

export default Header;