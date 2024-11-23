import { FC, memo } from "react";

/**
 * ==> props interface
 */
interface IProps {
  title?:string,
  subTitle?:string
}

/**
 * ==> Component
 */
const SecTitle: FC<IProps> = ({ title , subTitle }) => {
  return (
    <>
      <div className={` ${subTitle ? 'mb-10' : 'mb-6'}  mt-4`}>
        <h2 className="text-base flex items-center mb-2 text-accent relative px-4 md:px-5 before:h-5 before:w-2 before:md:h-6 before:md:w-3 before:absolute rtl:before:right-0 ltr:before:left-0 before:rounded before:bg-accent font-semibold">{title}</h2>
        {
          subTitle &&
          <p className="font-semibold text-xs md:text-sm md:mx-8 ">{subTitle}</p>
        }
      </div>
    </>
  );
}

export default memo(SecTitle);