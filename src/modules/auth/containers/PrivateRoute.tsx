import { Layout } from 'antd';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import { MainLayout } from '../../../components/Layout';
import HeaderMainDemo from '../../../components/Header/MainDemo';
import { IState } from '../index';

const { Content } = Layout;

interface IProps {
  auth: IState;
}

class Container extends Component<IProps & RouteProps> {
  render() {
    const { auth, component: Comp, ...props } = this.props;
    const user = auth.user;
    return (
      <Route
        {...props}
        render={(p: any) =>
          auth && auth.authenticated && auth.user ? (
            Comp && (
              <MainLayout>
                <HeaderMainDemo user={user} />
                <Layout className="site-layout demo-layout">
                  <Content style={{ minHeight: 'calc(100vh - 64px)', overflow: 'initial' }}>
                    <Comp {...p} />
                  </Content>
                </Layout>
              </MainLayout>
            )
          ) : (
            <Redirect to={{ pathname: `${process.env.REACT_APP_ROOT_PATH}/login`, state: { from: p.location } }} />
          )
        }
      />
    );
  }
}

export default connect((state: { auth: IState; smeProfile: any }) => ({
  auth: state.auth,
}))(Container);
