import { useState } from "react";
import Head from "next/head";
import { Button, Form, Input } from "antd";
import { signIn } from "next-auth/react";
import Router from "next/router";
import { toast } from 'react-toastify';

const Login = () => {
  const [isSignInPending, setSignInPending] = useState(false);

  const redirectToHome = () => {
    Router.push("/");    
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
    <div className="container">
      <Head>
        <title>Giriş Yap</title>
        <meta name="description" content="Diet Notebook" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="login-form-wrapper">
        <h3 className="title">Giriş Yap</h3>

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

          <Button type="primary" htmlType="submit" className="btn-login" loading={isSignInPending}>
            Giriş Yap
          </Button>
        </Form>
        <p className="txt-register">Hesabın yoksa <a href="/auth/register">Kayıt ol!</a></p>
      </div>
    </div>
  );
};

export default Login;
