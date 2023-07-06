import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Form, Input } from 'antd';
import '../style/login.css'
import { useDispatch } from 'react-redux'

const Login: React.FC = () => {
  const dispatch = useDispatch()
  const onFinish = (values: any) => {
    console.log('Success:', values);
    localStorage.setItem('formData', JSON.stringify(values))
    dispatch({ type: 'addFormData', val: values })
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <div>
      <p className='loginTitle'>登录</p>
      <Form
        name="basic"
        wrapperCol={{ offset: 2, span: 20 }}
        style={{ maxWidth: 400 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          name="username"
          validateTrigger='onBlur'
          rules={[
            { required: true, message: '请输入用户名' },
            { max: 6, message: '用户名不能超过6位' },
            { pattern: RegExp('^[0-9a-zA-Z]{1,}$', 'g'), message: "用户名格式错误" }
          ]}
        >
          <Input placeholder='请输入用户名' />
        </Form.Item>

        <Form.Item
          name="password"
          validateTrigger='onBlur'
          rules={[{ required: true, message: '请输入密码' },
          { min: 6, message: "密码不能少于6位" },
          { pattern: RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$%^&+=]).*$', 'g'), message: "密码格式错误" }
          ]}
        >
          <Input.Password placeholder='请输入密码' />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 2, span: 30 }}>
          <Button type="primary" htmlType="submit" className='loginBtn'>
            登录
          </Button>
        </Form.Item>
      </Form>
      <div className='linkBox'>
        <Link to="forgetpass" className='forgetLink'>忘记密码</Link>
        <div>
          没有账号？<Link to="register" className='registerLink'>快速注册</Link>
        </div>
      </div>
    </div>
  );
}

export default Login;