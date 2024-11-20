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
        <div className="rights text-sm flex items-center justify-between bg-white shadow-shadow py-5 px-4 rounded sticky bottom-0 ">
          <p className="">Hand-crafted & Made by ENG/ AHMED HELAL</p>
          <p>COPYRIGHT © 2024</p>
        </div>
      </div>
    </footer>
    </>
  );
}

export default memo(Footer);