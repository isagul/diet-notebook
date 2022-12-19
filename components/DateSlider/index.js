import { Collapse } from 'antd';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useDispatch, useSelector } from 'react-redux';
import { Input, Tabs, Form, Button, Row, Col } from 'antd';

import { Meal } from '@/components/index';
import { setDietList } from '@/store/slices/dietListSlice';
import { getAllDaysInMonth } from '@/utils/getAllDaysInMonth';
import { createDailyResults, getUserDietList } from '@/services/diet';

import styles from './styles.module.scss';

const DEFAULT_ACTIVE_KEY = String(new Date().getDate() - 1);
const { Panel } = Collapse;

const formatDate = day => {
  const d = new Date(day);
  return `${d.getDate()}-${d.getMonth() + 1}-${d.getFullYear()}`;
};

const DateSlider = () => {
  const now = new Date();
  const days = getAllDaysInMonth(now.getFullYear(), now.getMonth());
  const [clickedDate, setClickedDate] = useState(formatDate(days[DEFAULT_ACTIVE_KEY]));
  const dietList = useSelector(state => state.dietList.data);
  const { data: session } = useSession();
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  useEffect(() => {
    const currentDate = dietList.find(dietItem => dietItem.date === clickedDate);
    if (currentDate) {
      form.setFieldsValue({
        stepCount: currentDate.stepCount,
        waterAmount: currentDate.waterAmount,
      })
    }
  }, [dietList, form, clickedDate]);

  const onFinish = values => {
    const data = {
      ...values,
      email: session.user.email,
      date: clickedDate,
    }
    createDailyResults({ data })
      .then(() => {
        getUserDietList({ data: { email: data.email } })
          .then(dietListResponse => {
            const { dietList } = dietListResponse
            dispatch(setDietList(dietList));
          })
          .catch(error => {
            console.log('error :>> ', error);
          })
        toast.success("Günlük sonuçlar başarıyla kaydedildi.")
      })
      .catch(error => {
        console.log('error :>> ', error);
      })
  }

  const dayContent = () => {
    return (
      <div className={styles.dayContentWrapper}>
        <div className={styles.dailyTargetsWrapper}>
          <Collapse>
            <Panel header="Günlük Sonuçlar" key="1">
              <div className={styles.content}>
                <Form
                  name="basic"
                  layout="vertical"
                  onFinish={onFinish}
                  autoComplete="off"
                  form={form}
                >
                  <Row gutter={[8, 8]}>
                    <Col span={12} sm={12} xs={24}>
                      <Form.Item
                        label="Adım Sayısı:"
                        name="stepCount"
                      >
                        <Input placeholder="Bugün kaç adım attın?" />
                      </Form.Item>
                    </Col>
                    <Col span={12} sm={12} xs={24}>
                      <Form.Item
                        label="Su Miktarı:"
                        name="waterAmount"
                      >
                        <Input placeholder="Bugün kaç litre su içtin?" />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row justify="end">
                    <Button type="primary" htmlType="submit" className={styles.btnSaveDailyInfo}>Kaydet</Button>
                  </Row>
                </Form>
              </div>
            </Panel>
          </Collapse>
        </div>
        <Meal dayList={dietList} currentDate={clickedDate} />
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
      <div className={styles.titleWrapper}>
        <h3>Günlük Menü</h3>
        <p>Tarih: {clickedDate}</p>
      </div>
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