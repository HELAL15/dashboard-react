import { FC } from "react";
import { Navigate, Outlet } from "react-router";
import { RootState } from "../redux/store";
import { useSelector } from "react-redux";
import { getToken } from "./Utils";

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

  return (
    <>

      {
        isAuthenticated && token ? <Outlet/> : <Navigate to={'/admin/login'} replace  />
      }

    </>
  );
}

export default ProtectedRoutes;