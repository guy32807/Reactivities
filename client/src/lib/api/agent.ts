import axios from "axios";
import { store } from "../stores/store";
import { toast } from "react-toastify";
import { router } from "../../app/router/Routes";
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
    await new Promise(resolve => setTimeout(resolve, 500));
    store.uiStore.isIdle();
    return response;
}, async error => {
    const {status, data} = error.response;
    switch (status) {
        case 400:
            if(data.errors) {
                const modelStateErrors = [];
                for (const key in data.errors) {
                    if (data.errors[key]) {
                        modelStateErrors.push(data.errors[key]);
                    }
                }
                throw modelStateErrors.flat();
            }
            toast.error('Bad Request');
            break;
        case 401:
            toast.error('Unauthorized');
            break;
        case 403:
            toast.error('Forbidden');
            break;
        case 404:
            router.navigate('/not-found');
            break;
        case 500:
            router.navigate('/server-error', {state: {error: data}});
            break;
        default:
            toast.error('An unexpected error occurred');
            break;
    }
    return Promise.reject(error);
});

export default agent;