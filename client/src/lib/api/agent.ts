import axios from "axios";
import { store } from "../stores/store";
const agent = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});

agent.interceptors.request.use(config => {
    store.uiStore.isBusy();
    return config;
}, error => {
    store.uiStore.isIdle();
    return Promise.reject(error);
});

agent.interceptors.response.use(async response => {
    return response;
}, async error => {
    const {data, status} = error.response;
    switch (status) {
        case 400:
            console.log('Bad Requestllllaaaaaa', data);
            break;
        case 401:
            console.log('Unauthorized', data);
            break;
        case 403:
            console.log('Forbidden', data);
            break;
        case 404:
            console.log('Not Found', data);
            break;
        case 500:
            console.log('Server Error', data);
            break;
        default:
            console.log('Unknown Error', data);
            break;
    }
    return Promise.reject(error);
});

export default agent;