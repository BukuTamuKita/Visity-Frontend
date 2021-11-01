import Cookies from "js-cookie";

export const setUserLogin = (jwt) => {
    Cookies.set("JWT", jwt);
}

export const login = (jwt) => {
    Cookies.set("JWT", jwt);
}

export const logout = () => {
    Cookies.remove("JWT");
}

export const isLogin = () => {
    if (Cookies.get("JWT")) {
        return true;
    } 
    return false;
}