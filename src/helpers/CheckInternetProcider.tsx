import { FC, memo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { handleStatusChange } from "../redux/features/InternetSlice";
import OfflineConnection from "../components/global/OfflineConnection";

/**
 * ==> props interface
 */
interface IProps {
  children: any;
}

/**
 * ==> Component
 */
const CheckInternetProcider: FC<IProps> = ({ children }) => {

  const connectionStatus = useSelector((state: RootState)=> state.internetConnection.value);

  const dispatch = useDispatch();

  useEffect(() => {

    // Handle the status change
    const updateStatus = () => {
      dispatch(handleStatusChange());
    };

    // Listen to the online status
    window.addEventListener('online', updateStatus);

    // Listen to the offline status
    window.addEventListener('offline', updateStatus);

    // Specify how to clean up after this effect for performance improvment
    return () => {
      window.removeEventListener('online', updateStatus);
      window.removeEventListener('offline', updateStatus);
    };
}, [connectionStatus]);


  return (
    <>
    {
      connectionStatus === 'offline' ? <OfflineConnection/> : children
    }
    </>
  );
}

export default memo(CheckInternetProcider);