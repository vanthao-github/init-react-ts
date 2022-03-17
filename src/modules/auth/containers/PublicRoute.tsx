import React, { Component } from 'react';
import { Route, RouteProps } from 'react-router-dom';
import { MainLayout } from '../../../components/Layout';

class Container extends Component<RouteProps> {
  render() {
    const { component: Comp, ...props } = this.props;
    return (
      <Route
        {...props}
        render={(p: any) =>
          Comp && (
            <MainLayout>
              <Comp {...p} />
            </MainLayout>
          )
        }
      />
    );
  }
}

export default Container;
