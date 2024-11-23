import { FC, useEffect } from "react";
import { Navigate, Outlet, useNavigate } from "react-router";
import { persistor, RootState } from "../redux/store";
import {  useDispatch, useSelector } from "react-redux";
import { getToken, isTokenExpired, removeAllTokens } from "./Utils";
import { setUser } from "../redux/features/UserSlice";

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

  const dispatch =  useDispatch()
  useEffect(() => {
    const checkTokenValidity = () => {
      const isMyTokenExpired = isTokenExpired(token);

      if (token && isMyTokenExpired) {
        persistor.purge()
        removeAllTokens();
        // dispatch(removeUser());
        navigate("/admin/login", { replace: true });
      }
      if (!token){
        dispatch(setUser({}))
        navigate("/admin/login", { replace: true });
        persistor.purge()
      }
    };

    const intervalId = setInterval(checkTokenValidity, 120000);

    checkTokenValidity();

    return () => clearInterval(intervalId);
  }, [dispatch, navigate]);


  return (
    <>
      {
        isAuthenticated && token ? <Outlet/> : <Navigate to={'/admin/login'} replace  />
      }
    </>
  );
}

export default ProtectedRoutes;