import axios from 'axios';

const KEY = 'AIzaSyDwh6lm-Wfgdre7dyP7PK5FZhQU6yhksms';

export default axios.create({
  baseURL: 'https://www.googleapis.com/youtube/v3',
  params: {
    part: 'snippet',
    maxResults: 5,
    key: KEY
  }
});
