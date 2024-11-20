import { FC, memo } from "react";
import ProductCard from "../../components/global/ProductCard";

/**
 * ==> props interface
 */
interface IProps {

}

/**
 * ==> Component
 */
const Cancellations: FC<IProps> = ({  }) => {
  return (
    <>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6 px-4 py-8">
        <ProductCard/>
        <ProductCard/>
        <ProductCard/>
      </div>
    </>
  );
}

export default memo(Cancellations);