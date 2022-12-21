import Image from "next/image";
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { useSession } from 'next-auth/react';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Input, Button, Divider, Space, Popconfirm, List, Empty } from 'antd';

import { UpdateMealModal } from '@/components/index';
import HealthyFoodIcon from '@/public/healthy-food-icon.png';
import { getDietListSelector } from '@/store/selectors/dietListSelectors';
import { updateMealtoDiet, deleteMealItem, getUserDietListRequest } from '@/services/diet';

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
  const isDietListPending = useSelector(getDietListSelector.getIsPending);
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
          dispatch(getUserDietListRequest({ data: { email: data.email } }))
        })
        .catch(error => {
          toast(error.response.data.error);
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
        dispatch(getUserDietListRequest({ data: { email: data.email } }))
      })
      .catch(error => {
        toast(error.response.data.error);
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
                  <Button onClick={() => addMealToDiet(meal)}>Ekle</Button>
                </div>
                <div>
                  <List
                    itemLayout="horizontal"
                    dataSource={meal?.items}
                    loading={isDietListPending}
                    renderItem={item => (
                      <List.Item>
                        <List.Item.Meta
                          avatar={<Image src={HealthyFoodIcon} alt="list-image" height={30} width={30} />}
                          title={<span>{item.name}</span>}
                        />
                        <Space size="small">
                          <Button
                            type="primary"
                            shape="circle"
                            icon={<EditOutlined />}
                            onClick={() => handleOnClickEditMealItem(item, meal)}
                            className={styles.btnMealEdit}
                          />
                          <Popconfirm
                            title="Silmek istediğinden emin misin?"
                            onConfirm={() => handleOnClickDeleteMealItem(item, meal)}
                            okText="Evet"
                            cancelText="Hayır"
                          >
                            <Button
                              danger
                              type="primary"
                              shape="circle"
                              icon={<DeleteOutlined />}
                              className={styles.btnMealDelete}
                            />
                          </Popconfirm>

                        </Space>
                      </List.Item>
                    )}
                    locale={{ emptyText: <Empty description="Listeni oluştur." /> }}
                  />
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