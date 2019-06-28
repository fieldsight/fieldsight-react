import axios from "axios";

const csrfVal = window.csrf ? window.csrf : "FasSURCaozAKo7OHtkIhiTtOag7hVBBt";
const tokenVal = window.token
  ? window.token
  : "91a844e62e86b6e336b8fb440340cbeaabf601fe";

const setDefault = () => {
  axios.defaults.baseURL = "https://fieldsight.naxa.com.np/";
  axios.defaults.headers.common["X-CSRFTOKEN"] = csrfVal;
  axios.defaults.headers.common["Authorization"] = tokenVal;
};

export default setDefault;
