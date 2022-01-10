import axios from "axios";

axios.defaults.baseURL = 'http://45.76.155.229:8084/api/';
axios.defaults.headers.common['Authorization'] = 'Bearer ' + window.localStorage.getItem('token');  
