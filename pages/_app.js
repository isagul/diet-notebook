import 'antd/dist/reset.css';
import '@/styles/globals.css';
import '@/pages/auth/login/styles.scss';
import '@/pages/auth/register/styles.scss';
import { SessionProvider } from "next-auth/react";

function MyApp({ Component, pageProps }) {
  return (
    <SessionProvider
      session={pageProps.session}
      refetchInterval={5 * 60}
      refetchOnWindowFocus={true}
    >
      <Component {...pageProps} />
    </SessionProvider>
  )
}

export default MyApp
