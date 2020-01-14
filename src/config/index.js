import axios from "axios";

const csrfVal = window.csrf ? window.csrf : process.env.CSRF;
const tokenVal = window.token ? window.token : process.env.TOKEN;

const baseURL = window.base_url
  ? window.base_url
  : // : " http://ec2-18-220-9-254.us-east-2.compute.amazonaws.com";
    "https://fieldsight.naxa.com.np/";
// "http://192.168.1.34:8002";
// "https://app.fieldsight.org/";

const setDefault = () => {
  axios.defaults.baseURL = baseURL;
  axios.defaults.headers.common["X-CSRFTOKEN"] = csrfVal;
  axios.defaults.headers.common.Authorization = tokenVal;
};

export default setDefault;
