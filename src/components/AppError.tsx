import React, { Component } from 'react';
import { notification, Typography } from 'antd';
import ErrorContainer, { IProps } from '../modules/error/container';

const { Text } = Typography;

type DescProps = {
  errors?: any[];
};

const Description: React.FC<DescProps> = ({ errors }) => (
  <div className="notification-description">
    {errors?.map((msg) => {
      const prop = Object.keys(msg)[0];
      return (
        <p key={prop}>
          <Text type="danger">{msg[prop]}</Text>
        </p>
      );
    })}
  </div>
);
class AppError extends Component<IProps> {
  componentDidUpdate(prevProps: IProps) {
    const {
      error: { message, errors },
    } = this.props;
    console.log(message, errors);
    if (message !== prevProps.error.message && message) {
      notification.error({
        message: message,
        description: errors && <Description errors={errors} />,
        placement: 'bottomRight',
        onClose: () => this.props.doWipeError(),
      });
    }
  }
  render() {
    return null;
  }
}

export default ErrorContainer(AppError);
