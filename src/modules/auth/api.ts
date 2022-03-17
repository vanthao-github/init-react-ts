import request from '../../utils/request';

export function signIn(params: any) {
  return request('/auth/login', {
    method: 'POST',
    data: params,
  });
}
