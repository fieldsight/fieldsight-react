import axios from 'axios';

const csrfVal = window.csrf ? window.csrf : process.env.CSRF;
const tokenVal = window.token ? window.token : process.env.TOKEN;

const baseURL = window.base_url
  ? window.base_url
  : // :'http://192.168.88.80:8002/'
    'http://192.168.1.6:8002/';
// 'https://fieldsight.naxa.com.np/';
// : "https://app.fieldsight.org/";

const setDefault = () => {
  axios.defaults.baseURL = baseURL;
  axios.defaults.headers.common['X-CSRFTOKEN'] = csrfVal;
  axios.defaults.headers.common.Authorization = tokenVal;
};

export default setDefault;
