import Head from "next/head";
import { Button, Form, Input } from "antd";
import { signIn } from "next-auth/react";
import Router from "next/router";
import { toast } from 'react-toastify';

const Login = () => {

  const redirectToHome = () => {
      Router.push("/");
  };

  const onFinish = async values => {

    const res = await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect: false,
    });

    res.error ? toast(res.error) : redirectToHome();
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
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
          onFinishFailed={onFinishFailed}
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
            <Input />
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

          <Button type="primary" htmlType="submit" className="btn-login">
            Giriş Yap
          </Button>
        </Form>
        <p className="txt-register">Hesabın yoksa <a href="/auth/register">Kayıt ol!</a></p>
      </div>
    </div>
  );
};

export default Login;
