import React from 'react';
import { connect } from 'react-redux';
import { IState } from './index';
import { doWipeError } from 'react-easy-module/es/module';

export interface IProps {
  error: IState;
  doWipeError: () => void;
}

export default <T extends IProps>(Component: React.ComponentType<T>) => {
  class Container extends React.Component<IProps> {
    render() {
      return <Component {...(this.props as T)} />;
    }
  }
  function mapStateToProps(state: { error: IState }) {
    const { error } = state;
    return {
      error,
    };
  }
  return connect(mapStateToProps, { doWipeError })(Container);
};
