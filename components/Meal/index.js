import { useState } from 'react';
import { Input, Button, Divider } from 'antd';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { useSession } from 'next-auth/react';
import { useDispatch } from 'react-redux';

import { updateMealtoDiet, getUserDietList, deleteMealItem } from '@/services/diet';
import { setDietList } from '@/store/slices/dietListSlice';

import styles from './styles.module.scss';

const Meal = ({ dayList, currentDate }) => {
  const [mealItemName, setMealItemName] = useState(undefined);
  const selectedDate = dayList?.find(({ date }) => date === currentDate);
  const { data: session } = useSession();
  const dispatch = useDispatch();

  const handleOnChangeMealItem = e => {
    setMealItemName(e.target.value);
  };

  const addMealToDiet = meal => {
    if (mealItemName.trim().length > 0) {
      const { property } = meal;
      const data = {
        email: session?.user?.email,
        date: currentDate,
        mealName: property,
        item: mealItemName.trim(),
      };

      updateMealtoDiet({ data })
        .then(() => {
          getUserDietList({ data: { email: data.email } })
            .then(dietListResponse => {
              const { dietList } = dietListResponse
              dispatch(setDietList(dietList));
            })
            .catch(error => {
              console.log('error :>> ', error);
            })
        })
        .catch(error => {
          console.log('error :>> ', error);
        })
    }
  }

  const deleteMeal = (item, meal) => {
    const data = {
      email: session.user.email,
      itemId: item._id,
      mealName: meal.property,
      date: currentDate,
    };

    deleteMealItem({ data })
      .then(() => {
        getUserDietList({ data: { email: data.email } })
          .then(dietListResponse => {
            const { dietList } = dietListResponse
            dispatch(setDietList(dietList));
          })
          .catch(error => {
            console.log('error :>> ', error);
          })
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
            <div key={meal._id} className={styles.addMealWrapper}>
              <h4 className={styles.mealName}>{meal?.name}:</h4>
              <div>
                <div className={styles.addMealArea}>
                  <Input placeholder='Neler yedin?' onChange={e => handleOnChangeMealItem(e, meal)} />
                  <Button shape="circle" icon={<PlusOutlined />} onClick={() => addMealToDiet(meal)} />
                </div>
                <div>
                  <ul>
                    {meal?.items.map(item => {
                      return (
                        <li key={item._id} className={styles.mealItem}>
                          <span className={styles.mealName}>{item.name}</span>
                          <Button
                            danger
                            type="primary"
                            shape="circle"
                            icon={<DeleteOutlined />}
                            onClick={() => deleteMeal(item, meal)}
                            className={styles.btnMealDelete} />
                        </li>
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