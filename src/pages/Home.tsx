import { FC, memo } from "react";
import { FaShop } from "react-icons/fa6";
import HomeCard from "../components/home/HomeCard";
import Test from "./Test";
import SecTitle from "../components/global/SecTitle";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import PieChart from "../components/home/PieChart";


/**
 * ==> props interface
 */
interface IProps {

}

/**
 * ==> Component
 */
const Home: FC<IProps> = ({  }) => {


  const user = useSelector((state:RootState)=>state.user.data)
  const {
    name
  } = user


  return (
    <>
    <section className="pt-2">
      <div className="container">
        <SecTitle title={`hello mr/ ${name}`} />
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          <HomeCard link="products" icon={<FaShop/>} title="total products"  count={100} />
          <HomeCard link="categories" icon={<FaShop/>} title="total categories"  count={100} />
          <HomeCard link="users" icon={<FaShop/>} title="total users"  count={100} />
          <HomeCard link="faqs" icon={<FaShop/>} title="total FAQS"  count={50} />
          <HomeCard link="admins" icon={<FaShop/>} title="total admins"  count={100} />
          <HomeCard link="orders" icon={<FaShop/>} title="total orders"  count={100} />
          
        </div>

      </div>
    </section>
    <section>
      <div className="container">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 grid-rows-1 gap-4">
          <PieChart/>
          <PieChart/>
          <PieChart/>
          <PieChart/>
          
        </div>
      </div>
    </section>
    <Test/>
    </>
  );
}

export default memo(Home);