import { useEffect } from 'react';
import { Collapse, Descriptions } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useSession } from 'next-auth/react';
import Head from 'next/head';
import { SmileOutlined, MehOutlined, FrownOutlined } from '@ant-design/icons';

import styles from './styles.module.scss';

import { getUserDietListRequest } from '@/services/diet';
import { getDietListSelector } from '@/store/selectors/dietListSelectors';

const { Panel } = Collapse;

const TXT_NO_DATA = 'Kayıtlı veri bulunamadı.';

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
      return <FrownOutlined className={styles.frownOutlined} />;
    }
    if (stepCount >= 5000 && stepCount < 7500) {
      return <MehOutlined className={styles.mehOutlined} />;
    }
    if (stepCount >= 7500) {
      return <SmileOutlined className={styles.smileOutlined} />;
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
        {dietList &&
					dietList.length > 0 &&
					dietList.map(dietItem => {
					  return (
					    <Panel header={dietItem.date} key={dietItem._id}>
					      <Descriptions
					        bordered
					        column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
					        layout="vertical"
					        size="small"
					      >
					        {dietItem.meals.map(mealItem => {
					          return (
					            <Descriptions.Item label={mealItem.name} key={mealItem._id}>
					              {mealItem.items.length > 0 ? (
					                <ul>
					                  {mealItem.items.map(item => (
					                    <li key={item._id}>{item.name}</li>
					                  ))}
					                </ul>
					              ) : (
					                <span className={styles.txtNotFound}>{TXT_NO_DATA}</span>
					              )}
					            </Descriptions.Item>
					          );
					        })}
					        <Descriptions.Item label="Adım Sayısı">
					          {dietItem.stepCount ? (
					            <span>
					              {dietItem.stepCount} {createStepCountFace(dietItem.stepCount)}
					            </span>
					          ) : (
					            <span className={styles.txtNotFound}>{TXT_NO_DATA}</span>
					          )}
					        </Descriptions.Item>

					        <Descriptions.Item label="Su Miktari">
					          {dietItem.waterAmount ? (
					            <span>{dietItem.waterAmount}</span>
					          ) : (
					            <span className={styles.txtNotFound}>{TXT_NO_DATA}</span>
					          )}
					        </Descriptions.Item>
					      </Descriptions>
					    </Panel>
					  );
					})}
      </Collapse>
    </div>
  );
};

export default Summary;
