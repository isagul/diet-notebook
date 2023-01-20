import Image from "next/image";
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { useSession } from 'next-auth/react';
import { DeleteOutlined, EditOutlined, ArrowLeftOutlined, ArrowRightOutlined, PlusOutlined } from '@ant-design/icons';
import { Input, Button, Space, Popconfirm, List, Empty, Steps, Divider } from 'antd';

import styles from './styles.module.scss';

import { UpdateMealModal } from '@/components/index';
import HealthyFoodIcon from '@/public/healthy-food-icon.png';
import { getDietListSelector, getCurrentDateSelector, getCurrentMealSelector } from '@/store/selectors/dietListSelectors';
import { updateMealtoDiet, deleteMealItem, getUserDietListRequest } from '@/services/diet';
import { capitalizeFirstLetter } from '@/utils/capitalizeFirstLetter';
import { setCurrentMeal } from '@/store/slices/dietListSlice';

const defaultMealNames = {
  breakfast: undefined,
  firstSnack: undefined,
  afternoon: undefined,
  secondSnack: undefined,
  thirdSnack: undefined,
  dinner: undefined,
};

const Meal = () => {
  const dietList = useSelector(getDietListSelector.getData);
  const isDietListPending = useSelector(getDietListSelector.getIsPending);
  const currentMeal = useSelector(getCurrentMealSelector.getData);
  const currentDate = useSelector(getCurrentDateSelector.getData);
  const [mealItemName, setMealItemName] = useState(defaultMealNames);
  const [selectedMeal, setSelectedMeal] = useState(undefined);
  const [selectedMealItem, setSelectedMealItem] = useState(undefined);
  const [isUpdateMealModalVisible, setIsUpdateMealModalVisible] = useState(false);
  const selectedDate = dietList?.find(({ date }) => date === currentDate);
  const { data: session } = useSession();
  const dispatch = useDispatch();

  const nextMeal = () => {
    dispatch(setCurrentMeal(currentMeal + 1));
  };

  const prevMeal = () => {
    dispatch(setCurrentMeal(currentMeal - 1));
  };

  const items = selectedDate?.meals.map((meal) => ({
    key: meal._id,
    title: meal.name,
    content: (
      <>
        <div className={styles.addMealArea}>
          <Input
            placeholder="Neler yedin?"
            onPressEnter={() => addMealToDiet(meal)}
            onChange={e => handleOnChangeAddMealItem(e, meal)}
            value={mealItemName[meal?.property]}
            data-cy="input-meal-name"
          />
          <Button icon={<PlusOutlined />} onClick={() => addMealToDiet(meal)} data-cy="btn-add-meal">Ekle</Button>
        </div>
        <div className={styles.mealList}>
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
                    data-cy="btn-edit-meal"
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
                      data-cy="btn-delete-meal"
                    />
                  </Popconfirm>

                </Space>
              </List.Item>
            )}
            locale={{ emptyText: <Empty description={`${capitalizeFirstLetter(meal.name.toLowerCase())} listeni oluştur.`} /> }}
          />
        </div>
      </>
    )
  }));

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
          dispatch(getUserDietListRequest({ data: { email: data.email } }));
        })
        .catch(error => {
          toast(error.response.data.error);
        })
        .finally(() => {
          setMealItemName(defaultMealNames);
        });
    } else {
      toast("Alan boş bırakılamaz.");
    }
  };

  const handleOnClickDeleteMealItem = (item, meal) => {
    const data = {
      email: session.user.email,
      itemId: item._id,
      mealName: meal.property,
      date: currentDate,
    };

    deleteMealItem({ data })
      .then(() => {
        dispatch(getUserDietListRequest({ data: { email: data.email } }));
      })
      .catch(error => {
        toast(error.response.data.error);
      });
  };

  const handleOnClickEditMealItem = (item, meal) => {
    setSelectedMealItem(item);
    setSelectedMeal(meal);
    setIsUpdateMealModalVisible(true);
  };

  const handleOnChangeUpdateMealModal = value => {
    setIsUpdateMealModalVisible(value);
  };

  const onChangeSteps = value => {
    dispatch(setCurrentMeal(value));
  };

  return (
    <div className={styles.mealComponent}>
      <Steps current={currentMeal} items={items} onChange={onChangeSteps} />
      <Divider />
      <div className={styles.addMealWrapper}>{items && items[currentMeal].content}</div>
      <div className="steps-action">
        <Button
          style={{
            margin: '0 8px',
          }}
          onClick={() => prevMeal()}
          disabled={currentMeal === 0}
        >
          <ArrowLeftOutlined />
        </Button>
        <Button className="btn-common" type="primary" onClick={() => nextMeal()} disabled={currentMeal === selectedDate?.meals.length - 1 }>
          <ArrowRightOutlined />
        </Button>
      </div>
      <UpdateMealModal
        meal={selectedMeal}
        mealItem={selectedMealItem}
        currentDate={currentDate}
        isModalVisible={isUpdateMealModalVisible}
        handleVisibleChange={handleOnChangeUpdateMealModal}
      />
    </div>
  );
};

export default Meal;