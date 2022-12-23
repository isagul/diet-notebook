import { useState } from "react";
import Head from "next/head";
import { Button, Form, Input } from "antd";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { toast } from 'react-toastify';
import Link from "next/link";

import { ROUTES } from '@/constants/routes';

import styles from './styles.module.scss';

const Login = () => {
  const [isSignInPending, setSignInPending] = useState(false);
  const router = useRouter();

  const redirectToHome = () => {
    router.push(ROUTES.HOME);    
  };

  const onFinish = async values => {
    setSignInPending(true);
    const res = await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect: false,
    });

    res.error ? toast(res.error) : redirectToHome();
    setSignInPending(false);
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Giriş Yap</title>
        <meta name="description" content="Diet Notebook" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.loginFormWrapper}>
        <h3 className={styles.title}>Giriş Yap</h3>
        <Form
          name="basic"
          layout="vertical"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 24,
          }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            label="E-posta"
            name="email"
            rules={[
              {
                required: true,
                message: "Bu alan zorunludur!",
              },
            ]}
          >
            <Input autoFocus />
          </Form.Item>

          <Form.Item
            label="Şifre"
            name="password"
            rules={[
              {
                required: true,
                message: "Bu alan zorunludur!",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Button type="primary" htmlType="submit" className={styles.btnLogin} loading={isSignInPending}>
            Giriş Yap
          </Button>
        </Form>
        <p className={styles.txtRegister}>Hesabın yoksa <Link href={ROUTES.REGISTER_PAGE}>Kayıt ol!</Link></p>
      </div>
    </div>
  );
};

export default Login;
