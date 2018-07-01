import config from '../config';
export const getAllPages = () => fetch(config.API_ROOT).then(re => re.json());