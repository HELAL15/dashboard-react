import { FC, memo } from "react";


/**
 * ==> props interface
 */
interface IProps {

}

/**
 * ==> Component
 */
const Footer: FC<IProps> = ({  }) => {


  return (
    <>
    <footer className="py-4 ">
      <div className="container">
        <div className="rights text-xs md:text-sm flex flex-wrap gap-2 items-center justify-center md:justify-between bg-body-secondary shadow-shadow py-5 px-4 rounded sticky bottom-0 ">
          <p className="">Hand-crafted & Made by ENG/ AHMED HELAL</p>
          <p>COPYRIGHT © 2024</p>
        </div>
      </div>
    </footer>
    </>
  );
}

export default memo(Footer);