import React, { Component } from 'react';
import { connect } from 'react-redux';
import { IState } from '../index';

import E403Page from '../../../components/Pages/E403';

interface IProps {
  auth: IState;
}

const Authorize = (allowedRoles: string[]) => (Page: React.ComponentType<any>) => {
  class Container extends Component<IProps> {
    render() {
      const {
        auth: { user },
        ...props
      } = this.props;
      const role = user?.role;
      if (role && allowedRoles.includes(role)) {
        return <Page {...props} />;
      }
      return <E403Page />;
    }
  }
  return connect((state: { auth: IState }) => ({
    auth: state.auth,
  }))(Container);
};

export default Authorize;
