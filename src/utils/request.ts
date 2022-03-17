import axios from 'axios';
import Cookies from 'js-cookie';
import { TOKEN_NAME } from '../constants';

export default async function (
  endpoint: string,
  opts: any = {},
  withData = false,
  baseURL = process.env.REACT_APP_API_URI,
): Promise<{ response?: any; error?: any }> {
  const { headers, ...options } = opts;
  // const cookies = new Cookies();
  const config = Object.assign(
    {
      url: endpoint,
      baseURL,
      headers: Object.assign(
        {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${Cookies.get(TOKEN_NAME)}`,
        },
        headers,
      ),
      timeout: 60000,
    },
    options,
  );
  try {
    const response = await axios.request(config);
    return { response: (withData ? response.data : response) || {} };
  } catch (error) {
    if (error.response) {
      return {
        error: Object.assign(error.response.data, {
          status: error.response.status || error.request?.status,
        }),
      };
    }
    if (error.request && error.request._response) {
      return { error: { message: error.request._response } };
    }
    return { error: { message: error.message } };
  }
}
