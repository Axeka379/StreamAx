import React, { Component } from "react";
import { Form, Input, Button, Checkbox } from "antd";
import Cookies from "js-cookie";
export const getAccessToken = () => Cookies.get("access_token");
export const getRefreshToken = () => Cookies.get("refresh_token");
export const isAuthenticated = () => !!getAccessToken();

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const LoginForm = () => {
  const onFinish = async (values) => {
    console.log("Success:", values);
    const result = await fetch("https://jstrands.ddns.net:4000", {
      method: "POST",
      body: JSON.stringify({
        username: values.username,
        password: values.password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await result.json();
    console.log(json);
    if (json.message === "Accepted") {
      Cookies.set("access_token", json.APIToken, { expires: 10000 });
      Cookies.set("username", values.username, { expires: 10000 });
      window.location.reload();
    } else {
      document.querySelector("#loginMessage").innerText = json.message;
    }

    //
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div style={{ marginTop: "00px" }}>
      <span
        style={{ color: "red", height: "80px", margin: 0 }}
        id="loginMessage"
      ></span>
      <Form
        {...layout}
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        style={{ marginTop: "0" }}
        color="#999"
        labelCol="white"
      >
        <Form.Item
          style={{ color: "white" }}
          label="Username"
          name="username"
          labelCol="white"
          color="#999"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input color="#999" />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item {...tailLayout} name="remember" valuePropName="checked">
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default LoginForm;
