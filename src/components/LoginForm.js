<<<<<<< HEAD
import React, { Component } from "react";
import { Form, Input, Button, Checkbox } from "antd";
import Cookies from "js-cookie";
export const getAccessToken = () => Cookies.get("access_token");
export const getRefreshToken = () => Cookies.get("refresh_token");
export const isAuthenticated = () => !!getAccessToken();

export const authenticate = async () => {
  if (getRefreshToken()) {
    try {
      const tokens = await refreshTokens(); // call an API, returns tokens

      const expires = (tokens.expires_in || 60 * 60) * 1000;
      const inOneHour = new Date(new Date().getTime() + expires);

      // you will have the exact same setters in your Login page/app too
      Cookies.set("access_token", tokens.access_token, { expires: inOneHour });
      Cookies.set("refresh_token", tokens.refresh_token);

      return true;
    } catch (error) {
      redirectToLogin();
      return false;
    }
  }

  redirectToLogin();
  return false;
};

const refreshTokens = () => {};

class AuthenticateBeforeRender extends Component {
  state = {
    isAuthenticated: false,
  };

  componentDidMount() {
    authenticate().then((isAuthenticated) => {
      this.setState({ isAuthenticated });
    });
  }

  render() {
    return this.state.isAuthenticated ? this.props.render() : null;
  }
}

const redirectToLogin = () => {
  window.location.replace(`localhost:443`);
  // or history.push('/login') if your Login page is inside the same app
};
=======
import React from "react";
import { Form, Input, Button, Checkbox } from "antd";
>>>>>>> 17a6c09b546d0df879dac11e623daf256051a050

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const LoginForm = () => {
<<<<<<< HEAD
  const onFinish = async (values) => {
    console.log("Success:", values);
    const result = await fetch("http://localhost:4000", {
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
=======
  const onFinish = (values) => {
    console.log("Success:", values);
>>>>>>> 17a6c09b546d0df879dac11e623daf256051a050
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
<<<<<<< HEAD
    <div style={{ marginTop: "00px" }}>
      <span
        style={{ color: "red", height: "80px", margin: 0 }}
        id="loginMessage"
      ></span>
=======
    <div>
>>>>>>> 17a6c09b546d0df879dac11e623daf256051a050
      <Form
        {...layout}
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
<<<<<<< HEAD
        style={{ marginTop: "0" }}
=======
        style={{ marginTop: "50px" }}
>>>>>>> 17a6c09b546d0df879dac11e623daf256051a050
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
