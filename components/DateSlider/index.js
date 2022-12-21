import { Collapse } from 'antd';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useDispatch, useSelector } from 'react-redux';
import { Input, Tabs, Form, Button, Row, Col } from 'antd';

import { Meal } from '@/components/index';
import { createDailyResults, getUserDietListRequest } from '@/services/diet';
import { getDietListSelector } from '@/store/selectors/dietListSelectors';

import styles from './styles.module.scss';

const DEFAULT_ACTIVE_KEY = String(new Date().getDate() - 1);
const { Panel } = Collapse;

const DateSlider = () => {
  const dietList = useSelector(getDietListSelector.getData);
  const [activeKey, setActiveKey] = useState(undefined);
  const [clickedDate, setClickedDate] = useState(undefined);
  const { data: session } = useSession();
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  useEffect(() => {
    if (dietList && dietList.length > 0) {
      const currentDate = dietList[activeKey];
      if (currentDate) {
        form.setFieldsValue({
          stepCount: currentDate.stepCount,
          waterAmount: currentDate.waterAmount,
        })
      }
    }
  }, [dietList, form, activeKey]);

  useEffect(() => {
    if (dietList && dietList.length > 0 && clickedDate === undefined) {
      setClickedDate(dietList[DEFAULT_ACTIVE_KEY].date)
    }
  }, [dietList, clickedDate]);

  const onFinishDailyResults = values => {
    const data = {
      ...values,
      email: session.user.email,
      date: clickedDate,
    }
    createDailyResults({ data })
      .then(() => {
        dispatch(getUserDietListRequest({ data: { email: data.email } }))
        toast.success("Günlük sonuçlar başarıyla kaydedildi.")
      })
      .catch(error => {
        toast(error.response.data.error);
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
                  onFinish={onFinishDailyResults}
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

  const items = dietList.map((dietItem, index) => {
    return ({
      label: dietItem.date,
      key: String(index),
      children: dayContent(),
    })
  });

  const handleOnTabsChange = activeKey => {
    const selectedDate = items.find(item => item.key === activeKey);
    setClickedDate(selectedDate.label);
    setActiveKey(activeKey);
  }

  return (
    <div className={styles.dateSliderComponent}>
      <div className={styles.titleWrapper}>
        <h3>Günlük Liste</h3>
        <h4>Tarih: {clickedDate}</h4>
      </div>
      {
        dietList && dietList.length > 0 && (
          <Tabs
            defaultActiveKey={DEFAULT_ACTIVE_KEY}
            activeKey={activeKey}
            tabPosition="left"
            size='small'
            type='card'
            items={items}
            onChange={handleOnTabsChange}
          />
        )
      }
    </div>
  )
}

export default DateSlider;