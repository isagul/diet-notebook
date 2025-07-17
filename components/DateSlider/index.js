import { Collapse, DatePicker } from 'antd';
import { toast } from 'react-toastify';
import { useEffect, useMemo, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useDispatch, useSelector } from 'react-redux';
import { Input, Form, Button, Row, Col } from 'antd';
import dayjs from 'dayjs';

import styles from './styles.module.scss';

import { Meal } from '@/components/index';
import { createDailyResults, getUserDietListRequest } from '@/services/diet';
import { getDietListSelector, getCurrentDateSelector } from '@/store/selectors/dietListSelectors';
import { setCurrentDate } from '@/store/slices/dietListSlice';

const { Panel } = Collapse;

const dateFormat = 'DD.MM.YYYY';
const selectedDateFormat = 'D-M-YYYY';

const disabledDate = current => {
	const today = dayjs();

	return (
		!current ||
		current.month() !== today.month() ||
		current.year() !== today.year() ||
		current.isAfter(today, 'day')
	);
};

const DateSlider = () => {
	const dietList = useSelector(getDietListSelector.getData);
	const currentDate = useSelector(getCurrentDateSelector.getData);

	const { data: session } = useSession();
	const dispatch = useDispatch();
	const [form] = Form.useForm();
	const [selectedDate, setSelectedDate] = useState(
		currentDate && dayjs(currentDate, selectedDateFormat),
	);

	const isDietListExist = dietList && dietList.length > 0;

	useEffect(() => {
		if (isDietListExist && selectedDate) {
			const currentDiet = dietList.find(
				dietItem => dietItem.date === selectedDate.format(selectedDateFormat),
			);
			if (currentDiet) {
				form.setFieldsValue({
					stepCount: currentDiet.stepCount,
					waterAmount: currentDiet.waterAmount,
				});
			}
		}
	}, [dietList, form, selectedDate, isDietListExist]);

	const onFinishDailyResults = values => {
		const data = {
			...values,
			email: session.user.email,
			date: currentDate,
		};
		createDailyResults({ data })
			.then(() => {
				dispatch(getUserDietListRequest({ data: { email: data.email } }));
				toast.success('Günlük hedefler başarıyla kaydedildi.');
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
						<Panel header="Günlük Hedefler" key="1">
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
				label: dietItem.date,
				key: String(index),
				children: dayContent(),
			};
		});
	}, [dietList, currentDate]);

	const handleOnDateChange = date => {
		setSelectedDate(dayjs(date));
		dispatch(setCurrentDate(dayjs(date).format(selectedDateFormat)));
	};

	const currentMeal = useMemo(() => {
		return items.find(item => item.label === dayjs(selectedDate).format(selectedDateFormat));
	}, [selectedDate, items]);

	return (
		<div className={styles.dateSliderComponent}>
			<div className={styles.titleWrapper}>
				<h4>Günlük Liste</h4>
				{isDietListExist && (
					<DatePicker
						allowClear={false}
						format={dateFormat}
						disabledDate={disabledDate}
						onChange={handleOnDateChange}
						value={selectedDate}
					/>
				)}
			</div>
			{currentMeal && currentMeal.children}
		</div>
	);
};

export default DateSlider;
