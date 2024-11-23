import { FC, memo } from "react";
import SecTitle from "../../components/global/SecTitle";

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
    <section>
      <div className="container">
        <SecTitle title="Users" />
      </div>
    </section>
    </>
  );
}

export default memo(Users);