import { useState } from 'react';
import { Tabs } from 'antd';
import { useSelector } from 'react-redux';

import { Meal } from '@/components/index';
import { getAllDaysInMonth } from '@/utils/getAllDaysInMonth';

import styles from './styles.module.scss';

const DEFAULT_ACTIVE_KEY = "0";

const formatDate = day => {
  const d = new Date(day);
  return `${d.getDate()}-${d.getMonth() + 1}-${d.getFullYear()}`;
};

const DateSlider = () => {
  const now = new Date();
  const days = getAllDaysInMonth(now.getFullYear(), now.getMonth());
  const [clickedDate, setClickedDate] = useState(formatDate(days[DEFAULT_ACTIVE_KEY]));
  const dietList = useSelector(state => state.dietList.data);

  const dayContent = () => {
    return (
      <div className={styles.dateContentWrapper}>
        <div className={styles.title}>
          <h3>Günlük Menü ({clickedDate}) </h3>
          {/* <p>Tarih: {clickedDate}</p> */}
        </div>
        <div className={styles.mealWrapper}>
          <Meal dayList={dietList} currentDate={clickedDate} />
        </div>
      </div>
    )
  };

  const items = days.map((day, index) => {
    return ({
      label: formatDate(day),
      key: String(index),
      children: dayContent(),
    })
  });

  const handleOnTabsChange = activeKey => {
    const selectedDate = items.find(item => item.key === activeKey);
    setClickedDate(selectedDate.label);
  }

  return (
    <div className={styles.dateSliderComponent}>
      <Tabs
        defaultActiveKey={DEFAULT_ACTIVE_KEY}
        tabPosition="left"
        size='small'
        type='card'
        items={items}
        onChange={handleOnTabsChange}
      />
    </div>
  )
}

export default DateSlider;