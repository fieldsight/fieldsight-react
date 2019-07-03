import axios from "axios";

const csrfVal = window.csrf ? window.csrf : "FasSURCaozAKo7OHtkIhiTtOag7hVBBt";
const tokenVal = window.token
  ? window.token
  : "17ede4b52a21f1ec2b73525791750418113af4f1";

const setDefault = () => {
  axios.defaults.baseURL = "https://fieldsight.naxa.com.np/";
  axios.defaults.headers.common["X-CSRFTOKEN"] = csrfVal;
  axios.defaults.headers.common["Authorization"] = tokenVal;
};

export default setDefault;
