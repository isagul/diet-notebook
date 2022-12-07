import { Input, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import styles from './styles.module.scss';

const Meal = ({ name }) => {
  return (
    <div className={styles.mealComponent}>
      <h4 className={styles.mealName}>{name}:</h4>
      <div className={styles.addMealWrapper}>
        <div className={styles.addMealArea}>
          <Input placeholder='Neler yedin?' />
          <Button type="primary" shape="circle" icon={<PlusOutlined />} />
        </div>
        <div className={styles.mealList}>
          <ul>
            <li>Bir adet elma</li>
            <li>Az yağlı beyaz peynir</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Meal;