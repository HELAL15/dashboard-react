import { Tooltip } from "antd";
import { FC, memo } from "react";
import { FaEdit } from "react-icons/fa";
import { IoEye, IoTrash } from "react-icons/io5";
import { Link } from "react-router-dom";

/**
 * ==> props interface
 */
interface IProps {
id:any,
showModal:(id:any)=>void
}

/**
 * ==> Component
 */
const ActionButtons: FC<IProps> = ({ id , showModal }) => {
  return (
    <>
<div className="flex items-center justify-center gap-6 flex-wrap">
        <div className="modal">
          <Tooltip title="delete" placement="bottom" color="rgb(219 68 68)" >
            <button className=" py-3" onClick={()=>showModal(id)}>
              <IoTrash className="text-primary duration-300 hover:text-accent text-xl" />
            </button>
          </Tooltip>

        </div>
        <Tooltip title="update" placement="bottom" color="rgb(250 204 21)" >
          <Link to={`edit/${id}`} className=" py-3">
            {/* <IoPencil className="text-primary duration-300 hover:text-accent text-xl" /> */}
            <FaEdit className="text-primary duration-300 hover:text-yellow-400 text-xl"  />
          </Link>
        </Tooltip>
        <Tooltip title="view all details" placement="bottom" color="rgb(96 165 250)" >
          <Link to={`view/${id}`} className=" py-3  ">
            <IoEye className="text-primary duration-300 hover:text-blue-400 text-xl" />
          </Link>
        </Tooltip>
      </div>
    </>
  );
}

export default memo(ActionButtons);