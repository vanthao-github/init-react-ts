import React from 'react';
import { Layout } from 'antd';

import './Main.scss';

const MainLayout: React.FC = ({ children }) => {
  return <Layout className="MainLayout">{children}</Layout>;
};

export default MainLayout;
