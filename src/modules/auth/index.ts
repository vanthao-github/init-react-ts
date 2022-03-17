import { message } from 'antd';
import Cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';
import { IState as IStateBase, moduleOutput, toCamelKey } from 'react-easy-module/es/module';
import { TOKEN_NAME } from '../../constants';
import * as api from './api';
import { Account } from './interfaces';

export interface IState extends IStateBase {
  user?: Account;
  authenticated: boolean;
  id?: string;
  status?: string;
}
const loginUrl = '/login';
const AUTH_SIGN_IN = 'AUTH_SIGN_IN';
const AUTH_LOGOUT = 'AUTH_LOGOUT';

function parseToken(authToken?: string): Account | undefined {
  const token = authToken || Cookies.get(TOKEN_NAME);
  let user: Account | undefined;
  if (!token) return undefined;
  try {
    user = jwtDecode(token);
  } catch (e) {
    console.log('parseTokenError', e);
  }
  return user;
}

const initState = (): IState => ({
  isFetching: false,
  user: parseToken(),
  authenticated: !!Cookies.get(TOKEN_NAME),
  status: 'idle',
});

const inputs = [
  {
    action: AUTH_SIGN_IN,
    apiPayload(payload: any) {
      return {
        api: api.signIn,
        params: payload,
        next() {
          return `${process.env.REACT_APP_ROOT_PATH}/`;
        },
      };
    },
    onRequest(state: any) {
      return { ...state, id: undefined, user: undefined, authenticated: false };
    },
    onSuccess(state: any, payload: any) {
      const token = payload.response.data.access_token;
      const user: any = parseToken(token) || {};

      if (user) {
        Cookies.set(TOKEN_NAME, token);
        return {
          ...state,
          user,
          authenticated: !!token,
        };
      } else {
        message.error('Sorry, you are not authorized to access this page.');
        return state;
      }
    },
  },

  {
    action: AUTH_LOGOUT,
    apiPayload(payload: any) {
      return {
        api: () => Promise.resolve({ response: { data: payload } }),
        params: payload,
        next: loginUrl,
      };
    },
    onRequest(state: any) {
      Cookies.remove(TOKEN_NAME);
      return state;
    },
  },
];

const { actions, reducer, sagas } = moduleOutput(inputs)(initState);

export const doSignIn = actions[toCamelKey(`DO_${AUTH_SIGN_IN}`)];
export const doLogout = actions[toCamelKey(`DO_${AUTH_LOGOUT}`)];

export const authReducer = { auth: reducer };
export const authSagas = sagas;
