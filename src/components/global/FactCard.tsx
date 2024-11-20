import { FC, memo } from "react";

/**
 * ==> props interface
 */
interface IProps {
  img?:any,
  title?:string,
  body?:string,
}

/**
 * ==> Component
 */
const FactCard: FC<IProps> = ({ img , title , body }) => {

  return (
    <>
      <div className="card last:md:col-span-3 last:lg:col-span-1 last:mt-0 last:md:mt-16 last:lg:mt-0">
        <div className="card-img w-[50px] h-[50px] grid place-items-center outline-8 outline outline-gray-400 mx-auto bg-primary rounded-full ">
          <img src={img} alt="Fact" className="w-[40px] h-[40px] object-contain relative z-10" />
        </div>
        <div className="card-body text-center space-y-2 mt-6">
          <h2 className="text-lg font-semibold">{title}</h2>
          <p className="text-sm font-normal text-gray-500">{body}</p>
          {/* <p></p> */}
        </div>
      </div>
    </>
  );
}

export default memo(FactCard);