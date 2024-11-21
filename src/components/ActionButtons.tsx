import { FC, memo } from "react";
import { IoEye, IoPencil, IoTrash } from "react-icons/io5";
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
<div className="flex items-center justify-center gap-2 flex-wrap">
        <div className="modal">
          <button title="delete" className="rounded px-4 py-3 btn-primary" onClick={()=>showModal(id)}>
            <IoTrash />
          </button>

        </div>
        <Link title="edit" to={`edit/${id}`} className="rounded px-4 py-3 text-white duration-300 hover:bg-yellow-500 bg-yellow-400">
          <IoPencil className="text-white" />
        </Link>
        <Link title="view" to={`view/${id}`} className="rounded px-4 py-3 bg-primary/80 duration-300 hover:bg-primary ">
          <IoEye className="text-white" />
        </Link>
      </div>
    </>
  );
}

export default memo(ActionButtons);