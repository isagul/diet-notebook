import { useState } from 'react';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { useSession } from 'next-auth/react';
import { Input, Button, Divider, Space } from 'antd';
import { DeleteOutlined, PlusOutlined, EditOutlined } from '@ant-design/icons';

import { UpdateMealModal } from '@/components/index';
import { setDietList } from '@/store/slices/dietListSlice';
import { updateMealtoDiet, getUserDietList, deleteMealItem } from '@/services/diet';

import styles from './styles.module.scss';

const defaultMealNames = {
  breakfast: undefined,
  firstSnack: undefined,
  afternoon: undefined,
  secondSnack: undefined,
  thirdSnack: undefined,
  dinner: undefined,
};

const Meal = ({ dayList, currentDate }) => {
  const [mealItemName, setMealItemName] = useState(defaultMealNames);
  const [selectedMeal, setSelectedMeal] = useState(undefined);
  const [selectedMealItem, setSelectedMealItem] = useState(undefined);
  const [isUpdateMealModalVisible, setIsUpdateMealModalVisible] = useState(false);
  const selectedDate = dayList?.find(({ date }) => date === currentDate);
  const { data: session } = useSession();
  const dispatch = useDispatch();

  const handleOnChangeAddMealItem = (e, meal) => {
    const { property } = meal;
    setMealItemName({
      ...mealItemName,
      [property]: e.target.value,
    });
  };

  const addMealToDiet = meal => {
    const { property } = meal;
    if (mealItemName[property] && mealItemName[property].trim().length > 0) {
      const { property } = meal;
      const data = {
        email: session?.user?.email,
        date: currentDate,
        mealName: property,
        item: mealItemName[property].trim(),
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
        .finally(() => {
          setMealItemName(defaultMealNames);
        })
    } else {
      toast("Alan boş bırakılamaz.")
    }
  }

  const handleOnClickDeleteMealItem = (item, meal) => {
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

  const handleOnClickEditMealItem = (item, meal) => {
    setSelectedMealItem(item);
    setSelectedMeal(meal);
    setIsUpdateMealModalVisible(true);
  }

  const handleOnChangeUpdateMealModal = value => {
    setIsUpdateMealModalVisible(value);
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
                  <Input
                    placeholder='Neler yedin?'
                    onPressEnter={() => addMealToDiet(meal)}
                    onChange={e => handleOnChangeAddMealItem(e, meal)}
                    value={mealItemName[meal?.property]}
                  />
                  <Button shape="circle" icon={<PlusOutlined />} onClick={() => addMealToDiet(meal)} />
                </div>
                <div>
                  <ul>
                    {meal?.items.map(item => {
                      return (
                        <li key={item._id} className={styles.mealItem}>
                          <span className={styles.mealName}>{item.name}</span>
                          <Space size="small">
                            <Button
                              type="primary"
                              shape="circle"
                              icon={<EditOutlined />}
                              onClick={() => handleOnClickEditMealItem(item, meal)}
                            />
                            <Button
                              danger
                              type="primary"
                              shape="circle"
                              icon={<DeleteOutlined />}
                              onClick={() => handleOnClickDeleteMealItem(item, meal)}
                              className={styles.btnMealDelete}
                            />
                          </Space>
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
      <UpdateMealModal
        meal={selectedMeal}
        mealItem={selectedMealItem}
        currentDate={currentDate}
        isModalVisible={isUpdateMealModalVisible}
        handleVisibleChange={handleOnChangeUpdateMealModal}
      />
    </div>
  )
}

export default Meal;