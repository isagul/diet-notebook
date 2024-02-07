import { Collapse } from 'antd';
import { toast } from 'react-toastify';
import { useEffect, useMemo } from 'react';
import { useSession } from 'next-auth/react';
import { useDispatch, useSelector } from 'react-redux';
import { Input, Tabs, Form, Button, Row, Col } from 'antd';

import styles from './styles.module.scss';

import { Meal } from '@/components/index';
import { createDailyResults, getUserDietListRequest } from '@/services/diet';
import {
	getDietListSelector,
	getCurrentDateSelector,
	getActiveKeySelector,
} from '@/store/selectors/dietListSelectors';
import { setCurrentDate, setActiveKey } from '@/store/slices/dietListSlice';
import { getMonthName } from '@/utils/getDateWithMonthName';
import { getMonthCount } from '@/utils/getDateWithMonthCount';

const DEFAULT_ACTIVE_KEY = String(new Date().getDate() - 1);
const { Panel } = Collapse;

const DateSlider = () => {
	const dietList = useSelector(getDietListSelector.getData);
	const currentDate = useSelector(getCurrentDateSelector.getData);
	const activeKey = useSelector(getActiveKeySelector.getData);
	const { data: session } = useSession();
	const dispatch = useDispatch();
	const [form] = Form.useForm();

	const isDietListExist = dietList && dietList.length > 0;

	useEffect(() => {
		if (isDietListExist) {
			if (dietList[activeKey]) {
				form.setFieldsValue({
					stepCount: dietList[activeKey].stepCount,
					waterAmount: dietList[activeKey].waterAmount,
				});
			}
		}
	}, [dietList, form, activeKey, isDietListExist]);

	useEffect(() => {
		if (isDietListExist && currentDate === undefined) {
			dispatch(setCurrentDate(dietList[DEFAULT_ACTIVE_KEY].date));
		}
	}, [dietList, dispatch, currentDate, isDietListExist]);

	const onFinishDailyResults = values => {
		const data = {
			...values,
			email: session.user.email,
			date: currentDate,
		};
		createDailyResults({ data })
			.then(() => {
				dispatch(getUserDietListRequest({ data: { email: data.email } }));
				toast.success('Günlük sonuçlar başarıyla kaydedildi.');
			})
			.catch(error => {
				toast(error.response.data.error);
			});
	};

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
											<Form.Item label="Adım Sayısı:" name="stepCount">
												<Input placeholder="Bugün kaç adım attın?" />
											</Form.Item>
										</Col>
										<Col span={12} sm={12} xs={24}>
											<Form.Item label="Su Miktarı:" name="waterAmount">
												<Input placeholder="Bugün kaç litre su içtin?" />
											</Form.Item>
										</Col>
									</Row>
									<Row justify="end">
										<Button type="primary" htmlType="submit" className={styles.btnSaveDailyInfo}>
											Kaydet
										</Button>
									</Row>
								</Form>
							</div>
						</Panel>
					</Collapse>
				</div>
				<Meal />
			</div>
		);
	};

	const items = useMemo(() => {
		return dietList.map((dietItem, index) => {
			return {
				label: getMonthName(dietItem.date),
				key: String(index),
				children: dayContent(),
			};
		});
	}, [dietList, currentDate]);

	const handleOnTabsChange = activeKey => {
		const selectedDate = items.find(item => item.key === activeKey);
		dispatch(setCurrentDate(getMonthCount(selectedDate.label)));
		dispatch(setActiveKey(activeKey));
	};

	return (
		<div className={styles.dateSliderComponent}>
			<div className={styles.titleWrapper}>
				<h4>Günlük Liste</h4>
				{currentDate && <h4>Tarih: {getMonthName(currentDate)}</h4>}
			</div>
			{isDietListExist && (
				<Tabs
					defaultActiveKey={DEFAULT_ACTIVE_KEY}
					activeKey={activeKey}
					tabPosition="left"
					size="small"
					type="card"
					items={items}
					onChange={handleOnTabsChange}
				/>
			)}
		</div>
	);
};

export default DateSlider;
