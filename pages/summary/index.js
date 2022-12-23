import { useEffect } from 'react';
import { Collapse, Descriptions } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useSession } from 'next-auth/react';
import Head from 'next/head';
import { SmileOutlined, MehOutlined, FrownOutlined } from '@ant-design/icons';

import { getUserDietListRequest } from '@/services/diet';
import { getDietListSelector } from '@/store/selectors/dietListSelectors';

import styles from './styles.module.scss';

const { Panel } = Collapse;

const Summary = () => {
  const dispatch = useDispatch();
  const { data: session } = useSession();
  const dietList = useSelector(getDietListSelector.getData);

  useEffect(() => {
    if (session) {
      const data = {
        email: session?.user?.email,
      };
      dispatch(getUserDietListRequest({ data }));
    }
  }, [session, dispatch]);

  const createStepCountFace = stepCount => {
    if (stepCount < 5000) {
      return <FrownOutlined style={{ color: "#ff4d4f", fontSize: "16px" }} />
    }
    if (stepCount >= 5000 && stepCount < 7500) {
      return <MehOutlined style={{ color: "#e99709", fontSize: "16px" }} />
    }
    if (stepCount >= 7500) {
      return <SmileOutlined style={{ color: "#7de545", fontSize: "16px" }} />
    }
  };

  return (
    <div className={styles.summaryWrapper}>
      <Head>
        <title>Diyet Özetim</title>
        <meta name="description" content="Diet Notebook" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.titleWrapper}>
        <h4>Diyet Özetim</h4>
      </div>
      <Collapse>
        {
          dietList && dietList.length > 0 && (
            dietList.map(dietItem => {
              return (
                <Panel header={dietItem.date} key={dietItem._id}>
                  <Descriptions bordered column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }} layout="vertical" size="small">
                    {dietItem.meals.map(mealItem => {
                      return (
                        <Descriptions.Item label={mealItem.name}>
                          {mealItem.items.map(item => {
                            return (
                              <ul>
                                <li>{item.name}</li>
                              </ul>
                            )
                          })}
                        </Descriptions.Item>
                      )
                    })}
                    <Descriptions.Item label="Adım Sayısı">
                      {dietItem.stepCount} { createStepCountFace(dietItem.stepCount) }
                    </Descriptions.Item>
                    <Descriptions.Item label="Su Miktari">{dietItem.waterAmount}</Descriptions.Item>
                  </Descriptions>
                </Panel>
              )
            })
          )
        }
      </Collapse>
    </div>
  )
}

export default Summary;