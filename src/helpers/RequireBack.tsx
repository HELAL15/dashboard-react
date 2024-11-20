import { FC } from "react";
import { Navigate, Outlet } from "react-router";
import { getToken } from "./Utils";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

/**
 * ==> props interface
 */
interface IProps {

}

/**
 * ==> Component
 */
const RequireBack: FC<IProps> = ({  }) => {
  const token = getToken('accessTokenAdmin');

  const user = useSelector((state:RootState)=>state.user)

  const { isAuthenticated } = user
  return (
    <>
      {
        token && isAuthenticated ? <Navigate to={'/'} replace  /> : <Outlet/>
      }
    </>
  );
}

export default RequireBack;