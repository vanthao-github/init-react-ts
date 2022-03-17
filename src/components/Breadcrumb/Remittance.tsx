import React from 'react';
import { Breadcrumb } from 'antd';
import { Link } from 'react-router-dom';

type Props = {
  text: any;
  url: string;
};

const RemittanceBreadcrumb: React.FC<Props> = ({ text, url }) => {
  return (
    <Breadcrumb className="" separator=">">
      <Breadcrumb.Item>
        <Link to={url}>Home</Link>
      </Breadcrumb.Item>
      <Breadcrumb.Item>{text}</Breadcrumb.Item>
    </Breadcrumb>
  );
};

export default RemittanceBreadcrumb;
