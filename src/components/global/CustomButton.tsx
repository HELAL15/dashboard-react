import { Spin } from "antd";
import { FC, memo, ReactNode } from "react";

/**
 * ==> props interface
 */
interface IProps {
children: ReactNode;
className?: string;
onClick?: () => void;
type?: 'button' | 'submit' | 'reset';
disabled?: boolean;
loading?: boolean;
icon?:any
}

/**
 * ==> Component
 */
const CustomButton: FC<IProps> = ({ 
  children , 
  loading , 
  icon , 
  className='' ,
  onClick ,
  type='button'
}) => {
  return (
    <>
    <button 
    className={`${className} 
       flex items-center justify-center gap-1 
       w-fit btn btn-primary disabled:bg-primary 
       disabled:cursor-not-allowed  `}
    type={type}
    disabled={loading}
    onClick={onClick}
     >
      {icon && icon}
      {loading ? <Spin/> : children}
    </button>
    </>
  );
}

export default memo(CustomButton);