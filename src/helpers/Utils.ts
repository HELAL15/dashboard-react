


import Cookies from "cookie-universal";
import { persistor } from "../redux/store";


const  cookie = Cookies()

// get token from cookie
export const getToken = (tokenName:string) => {
  return cookie.get(tokenName)
}

// set token in cookie
export const setToken = (tokenName:string ,token:string) => {
  return cookie.set(tokenName , token , {
    expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
    secure: true, 
    sameSite: 'strict',
  })
}

// remove token from cookie
export const removeToken = (tokenName:string) => {
  return cookie.remove(tokenName)
}

// remove all tokens from cookie
export const removeAllTokens = () => {
  cookie.remove('accessTokenAdmin')
  persistor.purge();
  cookie.remove('persist:root', { path: '/' });
}