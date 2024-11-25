import { FC, useEffect } from "react";
import { Navigate, Outlet, useNavigate } from "react-router";
import { persistor, RootState } from "../redux/store";
import {  useDispatch, useSelector } from "react-redux";
import { getToken, isTokenExpired, removeAllTokens } from "./Utils";
import { setUnAuthed, setUser } from "../redux/features/UserSlice";

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


  const hndleUnAuthed = () => {
    dispatch(setUser({}))
    dispatch(setUnAuthed())
  }


  useEffect(() => {
    const checkTokenValidity = () => {
      const isMyTokenExpired = isTokenExpired(token);
      
      if (token && isMyTokenExpired) {
        persistor.purge()
        removeAllTokens();
        hndleUnAuthed()
        // dispatch(removeUser());
        navigate("/admin/login", { replace: true });
      }
      if (!token){
        hndleUnAuthed()
        navigate("/admin/login", { replace: true });
        persistor.purge()
      }
    };

    const intervalId = setInterval(checkTokenValidity, 60000);

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