import React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import './withBreadcrumb.scss';
import { Affix } from 'antd';

export default function <T = any>(Component: React.ComponentType<T>) {
  const Breadcrumb: React.FC<T & RouteComponentProps> = (props) => {
    return (
      <Affix offsetTop={0} style={{ zIndex: 9 }}>
        <div className="Breadcrumb">
          <Component {...props} />
        </div>
      </Affix>
    );
  };
  return withRouter(Breadcrumb);
}
