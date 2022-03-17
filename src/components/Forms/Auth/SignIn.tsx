import React from 'react';
import { Link } from 'react-router-dom';
import { Form, Input, Button } from 'antd';

import './Auth.scss';

type Props = {
  mtoId?: string;
  loading?: boolean;
  onSubmit?: (_: any) => void;
};

const SignInForm: React.FC<Props> = ({ loading, onSubmit }) => {
  return (
    <div className="SignInForm">
      <Form scrollToFirstError layout="vertical" hideRequiredMark colon={false} onFinish={onSubmit}>
        <div className="FormHeader">
          <div className="left">Login</div>
        </div>
        <div className="FormContent">
          <Form.Item
            label="Email Address"
            name="email"
            rules={[
              { type: 'email', message: 'Invalid Email' },
              { required: true, message: 'Required' },
            ]}
          >
            <Input size="large" placeholder="Email Address" />
          </Form.Item>
          <Form.Item label="Password" name="password" rules={[{ required: true, message: 'Required' }]}>
            <Input.Password size="large" placeholder="Password" />
          </Form.Item>
          <div className="ForgotPassword">
            <Link to={`/forgot-password`}>Forgot Password?</Link>
          </div>
        </div>
        <div className="FormFooter">
          <Button loading={loading} type="primary" htmlType="submit" block size="large">
            Login
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default SignInForm;
