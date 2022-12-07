import { UserOutlined } from '@ant-design/icons';

import styles from './styles.module.scss';

const Header = () => {
  return (
    <header className={styles.header}>
      <h3 className={styles.title}>Diyet Defteri</h3>
      <UserOutlined className={styles.userIcon} />
    </header>
  );
};

export default Header;