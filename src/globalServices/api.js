import {apiFunctions, getdata} from './utils';

const makeApiCall = async (endpoint, method, body = null) => {
  console.log('api', endpoint, method, body);
  const apiUrl = `${apiFunctions.url}${endpoint}`;
  let token = await getdata('token');
  console.log(apiUrl);

  const headers = {
    'Content-Type': 'multipart/form-data',
    Authorization: 'Bearer ' + token,
  };
  const options = {
    method: method,
    headers: headers,
  };
  if (body) {
    options.body = body;
  }
  try {
    const response = await fetch(apiUrl, options);
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error(error);
  }
};

export default makeApiCall;
