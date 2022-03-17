import React from 'react';
import { connect } from 'react-redux';
import { IState } from '../index';
import { Account } from '../interfaces';
import { RouteComponentProps } from 'react-router-dom';

export type IProps = RouteComponentProps & {
  account?: Account;
};

export default <T extends IProps>(Component: React.ComponentType<T>) => {
  class Container extends React.Component<IProps> {
    render() {
      return <Component {...(this.props as T)} />;
    }
  }
  function mapStateToProps(state: { auth: IState; account: any }) {
    const {
      auth: { user },
      account: { profile },
    } = state;
    return {
      account: profile || user,
    };
  }
  return connect(mapStateToProps)(Container);
};
