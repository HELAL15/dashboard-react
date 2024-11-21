import { FC, memo } from "react";
import { Link } from "react-router-dom";

/**
 * ==> props interface
 */
interface IProps {
  title: string,
  path: string,
  icon?: any
}

/**
 * ==> Component
 */
const TableLink: FC<IProps> = ({ title , path , icon }) => {
  return (
    <>
        <Link className="text-accent hover:underline hover:text-black flex items-center justify-center gap-2 underline "
          to={path} >
            {icon && icon}
             {title}
        </Link>
    </>
  );
}

export default memo(TableLink);