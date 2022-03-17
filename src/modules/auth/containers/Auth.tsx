import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import {
  doSignIn,
  IState,
} from '../index';

export interface IProps {
  isFetching: boolean;
  user: any;
  authenticated: boolean;
  id: any;
  doSignIn: (params: any) => void;
}

export default <T extends IProps>(Component: React.ComponentType<T>) => {
  class Container extends React.Component<IProps> {
    render() {
      const { authenticated, user } = this.props;
      return authenticated && user ? (
        <Redirect to={process.env.REACT_APP_ROOT_PATH || '/'} />
      ) : (
        <Component {...(this.props as T)} />
      );
    }
  }
  function mapStateToProps(state: { auth: IState; country: any; nationality: any }) {
    const {
      auth: { isFetching, authenticated, user, id },
    } = state;
    return {
      isFetching,
      user,
      authenticated,
      id,
    };
  }
  return connect(mapStateToProps, {
    doSignIn,
  })(Container);
};
