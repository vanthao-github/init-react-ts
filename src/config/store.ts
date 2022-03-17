import { configStore } from 'react-easy-module/es/store';
import { APP_NAME } from '../constants';
import { authReducer, authSagas } from '../modules/auth/index';

export default function () {
  return configStore(
    {},
    {
      reducerMap: {
        ...authReducer,
      },
      sagas: [...authSagas],
      appName: APP_NAME,
      debug: process.env.NODE_ENV !== 'production',
    },
  );
}
