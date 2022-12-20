import axios from "axios";

const axiosApi  =axios.create({
  baseURL: 'https://myproject17jsarsok-default-rtdb.europe-west1.firebasedatabase.app/',
});
export default axiosApi;