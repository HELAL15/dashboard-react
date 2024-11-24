


import Cookies from "cookie-universal";
import { persistor } from "../redux/store";
import { jwtDecode } from "jwt-decode";


const  cookie = Cookies()

// get token from cookie
export const getToken = (tokenName:string) => {
  return cookie.get(tokenName)
}


// set token in cookie
export const setToken = (tokenName:string ,token:string , durationInMinutes?:any ) => {
  const expiryDate = new Date();
  expiryDate.setMinutes(expiryDate.getMinutes() + durationInMinutes);
  return cookie.set(tokenName , token , {
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




export const isTokenExpired = (token: string): boolean => {
  try {
    const decoded:any = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    return decoded.exp < currentTime;
  } catch (error) {
    return true;
  }
};



export const handleLogout = async ()=> {
  try {
    await removeAllTokens()
  }catch(err:any){
    console.log(err)
  }
}