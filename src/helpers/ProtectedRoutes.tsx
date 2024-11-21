import { FC, useEffect } from "react";
import { Navigate, Outlet, useNavigate } from "react-router";
import { RootState } from "../redux/store";
import {  useSelector } from "react-redux";
import { getToken, isTokenExpired, removeAllTokens } from "./Utils";

/**
 * ==> props interface
 */
interface IProps {

}

/**
 * ==> Component
 */
const ProtectedRoutes: FC<IProps> = ({  }) => {

  const token = getToken('accessTokenAdmin');

  const user = useSelector((state:RootState)=>state.user)

  const { isAuthenticated } = user

  const navigate = useNavigate()

 
  

  const isMyTokenExpired = isTokenExpired(token)
  
  useEffect(()=>{
    if (token) {
      if (isMyTokenExpired) {
        removeAllTokens()
        setTimeout(() => {
          navigate('/admin/login');
        }, 0);
      }
    }
  },[ navigate , token])


  return (
    <>
      {
        isAuthenticated && token ? <Outlet/> : <Navigate to={'/admin/login'} replace  />
      }
    </>
  );
}

export default ProtectedRoutes;