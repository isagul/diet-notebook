import Head from "next/head";
import { Button, Form, Input } from "antd";
import axios from "axios";
import { signIn } from "next-auth/react";
import Router from "next/router";
import Link from "next/link";
import { toast } from 'react-toastify';

const Login = () => {
  const [form] = Form.useForm();
  const redirectToHome = () => {
    const { pathname } = Router;
    if (pathname === "/auth/register") {
      // TODO: redirect to a success register page
      Router.push("/");
    }
  };

  const onFinish = async values => {
    const { username, email, password } = values;
    const res = await axios
      .post(
        "/api/register",
        { username, email, password },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      )
      .then(async () => {
        await loginUser();
        redirectToHome();
      })
      .catch((error) => {
        toast(error)
      });
      toast(res)
  };

  const loginUser = async () => {
    const formValues = form.getFieldsValue();
    const res = await signIn("credentials", {
      redirect: false,
      email: formValues.email,
      password: formValues.password,
      callbackUrl: `${window.location.origin}`,
    });

    res.error ? toast(res.error) : redirectToHome();
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="container">
      <Head>
        <title>Kayıt Ol</title>
        <meta name="description" content="Diet Notebook" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="login-form-wrapper">
        <h3 className="title">Kayıt Ol</h3>

        <Form
          form={form}
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
            label="Kullanıcı Adı"
            name="username"
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

          <Button type="primary" htmlType="submit" className="btn-register">
            Kayıt Ol
          </Button>
        </Form>
        <p className="txt-login">Hesabın varsa <Link href="/auth/login">Giriş Yap!</Link></p>
      </div>
    </div>
  );
};

export default Login;
