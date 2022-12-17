import { useEffect } from "react";
import Head from "next/head";
import { Button, Form, Input } from "antd";
import { signIn, useSession } from "next-auth/react";
import Router from "next/router";
import Link from "next/link";
import { toast } from 'react-toastify';
import { useDispatch } from "react-redux";

import { createDietList, getUserDietList } from '@/services/diet';
import { Header } from '@/components/index';
import { registerUser } from '@/services/auth';
import { setDietList } from '@/store/slices/dietListSlice';

const Register = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const { data: session } = useSession();

  useEffect(() => {
    if (session) {
      const data = {
        email: session?.user?.email,
      };

      createDietList({ data })
        .then(() => {
          getUserDietList({ data: { email: data.email } })
            .then(dietListResponse => {
              const { dietList } = dietListResponse
              dispatch(setDietList(dietList));
            })
            .catch(error => {
              console.log('error :>> ', error);
            })
        })
        .catch(error => {
          console.log('error :>> ', error);
        })
    }
  }, [session, dispatch])

  const redirectToHome = () => {
    const { pathname } = Router;
    if (pathname === "/auth/register") {
      Router.push("/home");
    }
  };

  const onFinish = async values => {
    const res = registerUser({ data: values })
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

  return (
    <div className="container">
      <Head>
        <title>Kayıt Ol</title>
        <meta name="description" content="Diet Notebook" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
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
            <Input autoFocus />
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

export default Register;
