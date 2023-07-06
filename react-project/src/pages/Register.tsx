import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Form, Input } from 'antd';
import type { FormInstance } from 'antd';
import { useDispatch } from 'react-redux'

const CodeButton = ({ form }: { form: FormInstance }) => {
    const [submittable, setSubmittable] = React.useState(false);

    // Watch all values
    const values = Form.useWatch('telephone', form);

    React.useEffect(() => {
        form.validateFields(['telephone'], { validateOnly: true }).then(
            () => {
                setSubmittable(true);
            },
            () => {
                setSubmittable(false);
            },
        );
    }, [values]);

    return (
        <Button type="primary" className='getCodeBtn' disabled={!submittable}>获取验证码</Button>
    );
};



const Register: React.FC = () => {
    const dispatch = useDispatch()
    const onFinish = (values: any) => {
        console.log('Success:', values);
        localStorage.setItem('formData', JSON.stringify(values))
        dispatch({ type: 'addFormData', val: values })
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };
    const [form] = Form.useForm();
    return (
        <div>
            <p className='loginTitle'>用户注册</p>
            <Form
                form={form}
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
                    name="telephone"
                    validateTrigger='onBlur'
                    rules={[
                        { required: true, message: '请输入手机号' },
                        { pattern: RegExp('^1[3456789][0-9]{9}$', 'g'), message: "手机号格式错误" }
                    ]}
                >
                    <Input placeholder='请输入手机号' />
                </Form.Item>

                <div className='codeBox'>
                    <Form.Item
                        name="authCode"
                        validateTrigger='onBlur'
                        rules={[{ required: true, message: '请输入验证码' },
                        { pattern: RegExp('^[0-9]{6}$', 'g'), message: "验证码格式错误" }]}
                    >
                        <Input placeholder='请输入验证码' />
                    </Form.Item>
                    <CodeButton form={form} />
                </div>
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
                    <Button type="primary" htmlType="submit" className='registerBtn'>
                        注册
                    </Button>
                </Form.Item>
            </Form>
            <div className='linkBox'>
                <Link to="/login/forgetpass" className='forgetLink'>忘记密码</Link>
                <div>
                    已有账号？<Link to="/login" className='registerLink'>马上登录</Link>
                </div>
            </div>
        </div>)
}

export default Register