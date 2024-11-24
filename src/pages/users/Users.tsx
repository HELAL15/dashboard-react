import { FC, memo } from "react";
import SecTitle from "../../components/global/SecTitle";
import BreadCrumb from "../../components/global/BreadCrumb";

/**
 * ==> props interface
 */
interface IProps {

}

/**
 * ==> Component
 */
const Users: FC<IProps> = ({  }) => {
  return (
    <>
    <BreadCrumb/>
    <section>
      <div className="container">
        <SecTitle title="Users" />
      </div>
    </section>
    </>
  );
}

export default memo(Users);