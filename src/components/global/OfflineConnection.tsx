import { FC, memo } from "react";
import { RiWifiOffLine } from "react-icons/ri";


/**
 * ==> props interface
 */
interface IProps {

}

/**
 * ==> Component
 */
const OfflineConnection: FC<IProps> = ({  }) => {
  return (
    <>
    <section className="h-dvh grid place-items-center" >
      <div className="container">
        <div className="text-center space-y-2 md:space-y-3 lg:space-y-4">
          <span className="text-2xl md:text-4xl lg:text-6xl font-extrabold" >OOPS</span>
          <h1 className="text-3xl md:text-6xl lg:text-8xl 
          font-bold 
          flex gap-2 flex-wrap 
          items-center justify-center">
            You are offline <RiWifiOffLine className="text-accent" />
            </h1>
          <p className="text-xl md:text-3xl">Please check your internet connection</p>
        </div>
      </div>
    </section>
    </>
  );
}

export default memo(OfflineConnection);