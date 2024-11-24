import { FC, memo } from "react";
import BreadCrumb from "../../components/global/BreadCrumb";

/**
 * ==> props interface
 */
interface IProps {

}

/**
 * ==> Component
 */
const AddProduct: FC<IProps> = ({  }) => {
  return (
    <>
    <BreadCrumb/>
    <section>
      <div className="container">
        
      </div>
    </section>
    </>
  );
}

export default memo(AddProduct);
