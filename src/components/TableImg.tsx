import { FC, memo } from "react";

/**
 * ==> props interface
 */
interface IProps {
image?:any
}

/**
 * ==> Component
 */
const TableImg: FC<IProps> = ({ image }) => {
  return (
    <>
     <img className="w-[120px] mx-auto aspect-video object-contain " src={image} alt="" />
    </>
  );
}

export default memo(TableImg);