import { useState } from 'react';
import { Input, Button, Divider } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useSession } from 'next-auth/react';
import axios from 'axios';

import styles from './styles.module.scss';

const Meal = ({ dayList, currentDate }) => {
  const [mealItemName, setMealItemName] = useState(undefined);
  const selectedDate = dayList.find(({ date }) => date === currentDate);
  const { data: session } = useSession();
  
  const handleOnChangeMealItem = e => {
    setMealItemName(e.target.value);
  };

  const addMealToDiet = meal => {
    const { property } = meal;
    const data = {
      email: session?.user?.email,
      date: currentDate,
      mealName: property,
      item: mealItemName,
    };

    axios.put("http://localhost:3002/diet/updateMealtoDiet", data)
      .then(response => {
        console.log('response :>> ', response);
      })
      .catch(error => {
        console.log('error :>> ', error);
      })
  }

  return (
    <div className={styles.mealComponent}>
      {
        selectedDate?.meals.map(meal => {
          return (
            <div key={meal.property} className={styles.addMealWrapper}>
              <h4 className={styles.mealName}>{meal?.name}:</h4>
              <div>
                <div className={styles.addMealArea}>
                  <Input placeholder='Neler yedin?' onChange={e => handleOnChangeMealItem(e, meal)} />
                  <Button type="primary" shape="circle" icon={<PlusOutlined />} onClick={() => addMealToDiet(meal)} />
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