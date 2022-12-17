import 'antd/dist/reset.css';
import 'react-toastify/dist/ReactToastify.css';
import '@/styles/globals.css';
import { SessionProvider } from "next-auth/react";
import { Provider } from 'react-redux'
import { ToastContainer } from 'react-toastify';

import { store } from '../store';

function MyApp({ Component, pageProps }) {
  return (
    <SessionProvider
      session={pageProps.session}
      refetchInterval={60 * 60 * 24}
      refetchOnWindowFocus={true}
    >
      <Provider store={store}>
        <ToastContainer position="top-right" autoClose={2000} />
        <Component {...pageProps} />
      </Provider>
    </SessionProvider>
  )
}

export default MyApp
