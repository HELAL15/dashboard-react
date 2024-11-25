import { FC, memo } from "react";
import { useParams } from "react-router";

/**
 * ==> props interface
 */
interface IProps {

}

/**
 * ==> Component
 */
const SubCategoryDetails: FC<IProps> = ({  }) => {
  const {id} = useParams()
  console.log(id);
  
  return (
    <>
    <section>
      <div className="container">
        <div className="wrapper">
          {id}
        </div>
      </div>
    </section>
    </>
  );
}

export default memo(SubCategoryDetails);