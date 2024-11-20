import { FC, memo, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router";
import Aside from "./Aside";

/**
 * ==> props interface
 */
interface IProps {

}

/**
 * ==> Component
 */
const Layouts: FC<IProps> = ({  }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [close, setClose] = useState(false);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const toggleClose =()=>{
    setClose(!close)
    setCollapsed(false);
  }



  return (
    <> 
    <div className="flex">
      <Aside collapsed={collapsed} close={close} setClose={setClose} toggleClose={toggleClose} setCollapsed={setCollapsed} toggleCollapsed={toggleCollapsed} />
      <div className="flex-grow">
        <Header  collapsed={collapsed} toggleCollapsed={toggleCollapsed}  toggleClose={toggleClose} />
        <main className="overflow-auto">
          <Outlet/>
        </main>
        <Footer/>
      </div>
    </div>
    </>
  );
}

export default memo(Layouts);