import React from 'react';
import { Result, Button } from 'antd';
import { Link } from 'react-router-dom';

const E403Page = () => (
  <Result
    status="403"
    title="403"
    subTitle="Sorry, you are not authorized to access this page."
    extra={
      <Link to={process.env.REACT_APP_ROOT_PATH || '/'}>
        <Button type="primary">Back Home</Button>
      </Link>
    }
  />
);

export default E403Page;
