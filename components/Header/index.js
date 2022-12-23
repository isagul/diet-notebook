import { signOut, useSession } from "next-auth/react";
import { Button, Dropdown, Space, Typography, Badge } from "antd";
import Image from "next/image";
import Link from "next/link";
import { DownOutlined, LogoutOutlined, BarsOutlined, HomeOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";

import HomeImage from "public/home-image.png";
import { ROUTES } from '@/constants/routes';

import styles from './styles.module.scss';

const { Text } = Typography;

const Header = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const dropdownMenuItems = [
    {
      key: '1',
      label: (
        <Link href="/home">
          <Text>Ana Sayfa</Text>
        </Link>
      ),
      icon: <HomeOutlined />,
    },
    {
      key: '2',
      label: (
        <Link href="/summary">
          <Badge dot>
            <Text>Diyet Özetim</Text>
          </Badge>
        </Link>
      ),
      icon: <BarsOutlined />,
    },
    {
      key: '3',
      label: (
        <Text onClick={() => signOut({ callbackUrl: ROUTES.APP_PAGE })}>
          Çıkış Yap
        </Text>
      ),
      icon: <LogoutOutlined />,
    }
  ];

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
      <Link href={ROUTES.APP_PAGE}>
        <div className={styles.logoWrapper}>
          <Image src={HomeImage} alt="site-logo" height={50} width={50} />
          <h3 className={styles.title}>Diyet Defteri</h3>
        </div>
      </Link>

      {
        session && (router.pathname !== ROUTES.LOGIN_PAGE && router.pathname !== ROUTES.REGISTER_PAGE) && (
          <UserDropdown />
        )
      }

    </header>
  );
};

export default Header;