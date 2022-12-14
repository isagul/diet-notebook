import { Input, Button, Divider } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import styles from './styles.module.scss';

const Meal = ({ dayList, currentDate }) => {
  const selectedDate = dayList.find(({ day }) => day === currentDate);

  return (
    <div className={styles.mealComponent}>
      {
        selectedDate?.meals.map(meal => {
          return (
            <div key={meal.property} className={styles.addMealWrapper}>
              <h4 className={styles.mealName}>{meal?.name}:</h4>
              <div>
                <div className={styles.addMealArea}>
                  <Input placeholder='Neler yedin?' />
                  <Button type="primary" shape="circle" icon={<PlusOutlined />} />
                </div>
                <div>
                  <ul>
                    {meal?.items.map(item => {
                      return (
                        <li key={item.id}>{item.name}</li>
                      )
                    })}
                  </ul>
                </div>
              </div>
              <Divider />
            </div>
          )
        })
      }
    </div>
  )
}

export default Meal;