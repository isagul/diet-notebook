import 'antd/dist/reset.css';
import 'react-toastify/dist/ReactToastify.css';
import '@/styles/globals.css';
import { SessionProvider } from 'next-auth/react';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';

import { Layout } from '@/components/index';

import { store } from '@/store/index';

function MyApp({ Component, pageProps }) {
  return (
    <SessionProvider
      session={pageProps.session}
      refetchInterval={60 * 60 * 24}
      refetchOnWindowFocus={false}
    >
      <Provider store={store}>
        <ToastContainer position="top-right" autoClose={2000} />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Provider>
    </SessionProvider>
  );
}

export default MyApp;
