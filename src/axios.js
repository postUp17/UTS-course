import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://course-reco.firebaseio.com/'
});

export default instance;
