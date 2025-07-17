import 'antd/dist/reset.css';
import 'react-toastify/dist/ReactToastify.css';
import '@/styles/globals.css';
import { SessionProvider } from 'next-auth/react';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import locale from 'antd/locale/tr_TR';
import { ConfigProvider } from 'antd';
import dayjs from 'dayjs';
import 'dayjs/locale/tr';

import { Layout } from '@/components/index';
import { store } from '@/store/index';

dayjs.locale('tr');

function MyApp({ Component, pageProps }) {
	return (
		<SessionProvider
			session={pageProps.session}
			refetchInterval={60 * 60 * 24}
			refetchOnWindowFocus={false}
		>
			<ConfigProvider locale={locale}>
				<Provider store={store}>
					<ToastContainer position="top-right" autoClose={2000} />
					<Layout>
						<Component {...pageProps} />
					</Layout>
				</Provider>
			</ConfigProvider>
		</SessionProvider>
	);
}

export default MyApp;
