import React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import AuthContainer, { IProps } from '../../modules/auth/containers/Auth';
import { SignInForm } from '../Forms/Auth';
import './SignIn.scss';
import withUnAuth from './withUnAuth';

type Props = RouteComponentProps & IProps;

const SignInPage: React.FC<Props> = ({ isFetching, doSignIn }) => {
  return (
    <div className='signin-container'>
      <div className="Logo">
        <Link to='/'>
          <img src="/logo.svg" alt="logo" />
        </Link>
      </div>
      <div className="content-page">
        <div className="form-container">
          <SignInForm loading={isFetching} onSubmit={doSignIn} />
        </div>
      </div>
    </div>
  );
};

export default withUnAuth(AuthContainer(SignInPage));
