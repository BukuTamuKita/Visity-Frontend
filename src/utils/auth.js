import Cookies from 'js-cookie';
import { api } from '../constants/urls';

export const login = (jwt) => {
    Cookies.set('JWT', jwt);
    api.defaults.headers.common['Authorization'] = `Bearer ${jwt}`;
}

export const logout = () => {
    Cookies.remove('JWT');
}

export const isLogin = () => {
    if (Cookies.get('JWT')) {
        return true;
    } 
    return false;
}

export const getToken = () => {
    return Cookies.get('JWT');
}