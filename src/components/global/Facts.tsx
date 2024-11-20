import { FC, memo } from "react";
import fact1 from '../../assets/fact1.png'
import fact2 from '../../assets/fact2.png'
import fact3 from '../../assets/fact3.png'
import FactCard from "./FactCard";



/**
 * ==> props interface
 */
interface IProps {

}

/**
 * ==> Component
 */
const Facts: FC<IProps> = ({  }) => {
  return (
    <>
      <section className="my-10">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 place-items-center justify-center items-center lg:grid-cols-3 gap-16 md:gap-8 lg:gap-0">
            <FactCard img={fact1} title="FREE AND FAST DELIVERY" body="Free delivery for all orders over $140" />
            <FactCard img={fact2} title="24/7 CUSTOMER SERVICE" body="Friendly 24/7 customer support" />
            <FactCard img={fact3} title="MONEY BACK GUARANTEE" body="We reurn money within 30 days" />
          </div>
        </div>
      </section>
    </>
  );
}

export default memo(Facts);