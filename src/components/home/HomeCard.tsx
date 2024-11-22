import { FC, memo } from "react";
import { NavLink } from "react-router-dom";

/**
 * ==> props interface
 */
interface IProps {
  icon?: any;
  title?: string;
  count?: number;
  link?:string;
}

/**
 * ==> Component
 */
const HomeCard: FC<IProps> = ({ icon , title , count , link }) => {
  return (
    <>
      <NavLink to={`/${link}`} className="card rounded 
        shadow-shadow group px-4 py-3 sm:py-5 flex-col 
        sm:flex-row text-center sm:text-start flex items-center 
        flex-wrap justify-center sm:justify-start gap-2
         bg-body-secondary
          duration-300 
         relative overflow-hidden
         after:absolute after:bottom-0 after:w-full after:inset-x-0 hover:after:h-full after:h-[4px] after:bg-accent 
         after:rounded after:duration-200 after:z-0
         ">
        <i className="icon p-3 relative z-10 text-primary text-3xl group-hover:text-white duration-300">
          {icon}
        </i>
        <div className='relative z-10'>
          <h2 className="text-base font-semibold group-hover:text-white duration-300">{title}</h2>
          <p className="text-accent text-sm group-hover:text-white duration-300">{count}</p>
        </div>
      </NavLink>
    </>
  );
}

export default memo(HomeCard);