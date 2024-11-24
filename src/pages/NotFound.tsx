import { FC, memo } from "react";
import { Link } from "react-router-dom";

/**
 * ==> props interface
 */
interface IProps {

}

/**
 * ==> Component
 */
const NotFound: FC<IProps> = ({  }) => {
  return (
    <>
    <section className="h-dvh grid place-items-center">
      <div className="container">
        <div className="flex items-center gap-4 flex-col">
          <h2 className="text-primary text-[2rem] md:text-[4rem] text-center font-bold capitalize">404 not found page</h2>
          <p className="text-center mb-5">Your visited page not found. You may go home page.</p>
          <Link to={'/'} className="btn btn-primary" >back to home page</Link>
        </div>
      </div>
    </section>

    </>
  );
}

export default memo(NotFound);