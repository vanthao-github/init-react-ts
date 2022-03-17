import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { doLogout, IState } from '../index';

export interface IProps {
  authenticated: boolean;
  doLogout: (_: any) => void;
}

export default <T extends IProps>() => {
  class Container extends React.Component<IProps> {
    componentDidMount() {
      const { authenticated, doLogout } = this.props;
      authenticated && doLogout({});
    }
    render() {
      return this.props.authenticated ? null : <Redirect to={`${process.env.REACT_APP_ROOT_PATH}/login`} />;
    }
  }
  function mapStateToProps(state: { auth: IState }) {
    const {
      auth: { authenticated },
    } = state;
    return {
      authenticated,
    };
  }
  return connect(mapStateToProps, {
    doLogout,
  })(Container);
};
