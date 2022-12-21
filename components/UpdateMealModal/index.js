import { Input, Modal } from 'antd';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';

import { setDietList } from '@/store/slices/dietListSlice';
import { updateMealItem, getUserDietList } from '@/services/diet';

const UpdateMealModal = ({ meal, mealItem, currentDate, isModalVisible, handleVisibleChange }) => {
  const dispatch = useDispatch();
  const [currentMealItem, setCurrentMealItem] = useState(undefined);
  const { data: session } = useSession();

  useEffect(() => {
    setCurrentMealItem(mealItem?.name);
  }, [mealItem]);

  const handleOnChangeMealItem = e => {
    setCurrentMealItem(e.target.value);
  };

  const handleOnClickUpdateMealItem = () => {
    const { property } = meal;
    const data = {
      email: session?.user?.email,
      date: currentDate,
      mealName: property,
      item: currentMealItem.trim(),
      itemId: mealItem._id,
    };

    updateMealItem({ data })
      .then(() => {
        getUserDietList({ data: { email: data.email } })
          .then(dietListResponse => {
            const { dietList } = dietListResponse
            dispatch(setDietList(dietList));
          })
          .catch(error => {
            toast(error.response.data.error);
          })
      })
      .catch(error => {
        toast(error.response.data.error);
      })
      .finally(() => {
        handleVisibleChange(false);
      })
  };

  return (
    <div>
      <Modal
        title="Yemeği Güncelle"
        centered
        open={isModalVisible}
        okText="Kaydet"
        cancelText="Vazgeç"
        onOk={() => handleOnClickUpdateMealItem()}
        onCancel={() => handleVisibleChange(false)}
      >
        <Input value={currentMealItem} onChange={handleOnChangeMealItem} />
      </Modal>
    </div>
  );
};
export default UpdateMealModal;