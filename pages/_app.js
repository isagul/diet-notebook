import 'antd/dist/reset.css';
import 'react-toastify/dist/ReactToastify.css';
import '@/styles/globals.css';
import '@/pages/auth/login/styles.scss';
import '@/pages/auth/register/styles.scss';
import { SessionProvider } from "next-auth/react";

function MyApp({ Component, pageProps }) {
  return (
    <SessionProvider
      session={pageProps.session}
      refetchInterval={60 * 60 * 24}
      refetchOnWindowFocus={true}
    >
      <Component {...pageProps} />
    </SessionProvider>
  )
}

export default MyApp
