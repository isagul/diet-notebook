import { useState } from 'react';
import { Tabs } from 'antd';

import { Meal } from '@/components/index';
import { getAllDaysInMonth } from '@/utils/getAllDaysInMonth';

import styles from './styles.module.scss';

// const months = ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"];

const DEFAULT_ACTIVE_KEY = "0";

const formatDate = day => {
  const d = new Date(day);
  return `${d.getDate()}-${d.getMonth() + 1}-${d.getFullYear()}`;
};

const DateSlider = () => {

  const now = new Date();
  const days = getAllDaysInMonth(now.getFullYear(), now.getMonth());
  const [clickedDate, setClickedDate] = useState(formatDate(days[DEFAULT_ACTIVE_KEY]));

  const dayList = [
    {
      day: '1-12-2022',
      meals: [
        {
          property: 'breakfast',
          name: 'Kahvaltı',
          items: []
        },
        {
          property: 'firstSnack',
          name: 'Ara Öğün',
          items: []
        },
        {
          property: 'afternoon',
          name: 'Öğle Yemeği',
          items: []
        },
        {
          property: 'secondSnack',
          name: 'Ara Öğün 1',
          items: []
        },
        {
          property: 'thirdSnack',
          name: 'Ara Öğün 2',
          items: []
        },
        {
          property: 'dinner',
          name: 'Akşam Yemeği',
          items: []
        },        
      ],
    },
    {
      day: '2-12-2022',
      meals: [
        {
          property: 'breakfast',
          name: 'Kahvaltı',
          items: [
            { id: 9, name: 'Bir adet elma' },
            { id: 10, name: 'Az yağlı beyaz peynir' },
          ]
        },
        {
          property: 'firstSnack',
          name: 'Ara Öğün',
          items: []
        },
        {
          property: 'afternoon',
          name: 'Öğle Yemeği',
          items: []
        },
        {
          property: 'secondSnack',
          name: 'Ara Öğün 1',
          items: []
        },
        {
          property: 'thirdSnack',
          name: 'Ara Öğün 2',
          items: []
        },
        {
          property: 'dinner',
          name: 'Akşam Yemeği',
          items: []
        }, 
      ]
    }
  ]

  const dayContent = () => {
    return (
      <div className={styles.dateContentWrapper}>
        <div className={styles.title}>
          <h3>Günlük Menü</h3>
          <p>Tarih: {clickedDate}</p>
        </div>
        <div className={styles.mealWrapper}>
          <Meal dayList={dayList} currentDate={clickedDate} />
          {/* <Meal name="Ara Öğün" mealItems={mealItems} />
          <Meal name="Öğle Yemeği" mealItems={mealItems} />
          <Meal name="Ara Öğün 1" mealItems={mealItems} />
          <Meal name="Ara Öğün 2" mealItems={mealItems} />
          <Meal name="Akşam Yemeği" mealItems={mealItems} /> */}
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