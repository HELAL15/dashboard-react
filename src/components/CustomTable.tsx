import { FC, memo, useState } from "react";
import { Link } from "react-router-dom";
import { Modal, Table, TableColumnsType } from "antd";
import { IoEye, IoPencil, IoTrash } from "react-icons/io5";
import { TableRowSelection } from "antd/es/table/interface";
import { FaFileExcel } from "react-icons/fa6";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { request } from "../api/request";

/**
 * ==> props interface
 */
interface IProps {
  // getDataEndPoint: string;
  deleteEndPoint: string;
  cols: TableColumnsType;
  data:any;
  isLoading:boolean;
  refetch:()=>void
}

/**
 * ==> Component
 */
const CustomTable: FC<IProps> = ({  data , isLoading , refetch , deleteEndPoint , cols  }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);

  const {i18n} = useTranslation()
  const lang = i18n.language
  // Fetch data based on the current page


const columns: TableColumnsType = [
  {
    title: "#", 
    dataIndex: "rowNumber",
    align: "center",
    render: (_: any, __: any, index: number) => (currentPage - 1) * pageSize + index + 1,
  },
    ...cols,
    {
      title: "action",
      dataIndex: "action",
      align: "center",
      responsive: ["xs", "sm", "md", "lg"],
    },
]


  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState('');
  const [id,setId] = useState('')

  const showModal = (id:any) => {
    setOpen(true);
    setId(id)
    setModalText('are you sure you want to delete this category?')
  };



  const handleOk = async () => {
    setConfirmLoading(true);
    try{
      const res = await request.delete(`/admin/${deleteEndPoint}/${id}`)
      console.log(res);
      toast.success(res.data.message)
      refetch()
      setOpen(false)
      setConfirmLoading(false);
    }catch(err:any){
      console.log(err);
      setConfirmLoading(false);
      setModalText(err.response.data.message)
      toast.error(err.response.data.message)
      setTimeout(() => {
        setOpen(false)
      }, 2000);
    }
  };

  const handleCancel = () => {
    setOpen(false);
  };

  // Transform the fetched data into the table's data source
  const source = data?.data?.data?.map((item: any) => ({
    key: item.id,

    question: item[`question_${lang}`] || '',
    answer: item[`answer_${lang}`] || '',
    title: item[`title_${lang}`] || '',
    parentTitle: item[`parent_title_${lang}`] || '',
    viewSubCategorys: <Link className="btn block w-fit mx-auto text-accent hover:text-accent duration-300 hover:bg-accent/30 outline-accent hover:outline outline outline-1 hover:outline-1" to={`/sub-categories?parent_id=${item.id}`} > view sub category </Link> ,
    image: <img className="w-[120px] mx-auto aspect-video object-contain " src={item[`category_image`]} alt="" /> || '',
    
    action: (
      <div className="flex items-center justify-center gap-2 flex-wrap">
        <div className="modal">
          <button title="delete" className="rounded px-4 py-3 btn-primary" onClick={()=>showModal(item.id)}>
            <IoTrash />
          </button>

        </div>
        <Link title="edit" to={`edit/${item.id}`} className="rounded px-4 py-3 text-white duration-300 hover:bg-yellow-500 bg-yellow-400">
          <IoPencil className="text-white" />
        </Link>
        <Link title="view" to={`view/${item.id}`} className="rounded px-4 py-3 bg-primary/80 duration-300 hover:bg-primary ">
          <IoEye className="text-white" />
        </Link>
      </div>
    ),
  }));

  // Pagination handler
  const handlePaginationChange = (page: number) => {
    setCurrentPage(page);
    refetch(); 
    window.scrollTo({top:0, left:0 , behavior:"smooth"})
  };


  // handle row selection
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log('selectedRowKeys changed: ', newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection: TableRowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const hasSelected = selectedRowKeys.length > 0;

  const handleRefresh = async () => {
    try{
      const res = await request.get('user/refresh')
      console.log(res);
      
    }catch(err){
      console.log(err);
    }
  }



  return (
    <>
    <button onClick={handleRefresh} >click me</button>
<div className="flex items-center justify-between mb-4">
          {hasSelected ? 
          <>
            <p>Selected {selectedRowKeys.length} items</p>
            <div className="actions flex items-center gap-2">
              <button className="btn btn-primary">Delete selected</button>
              <button className="btn btn-primary w-fit">
                <FaFileExcel/>
              </button>
            </div>
          </>
           : null}
        </div>
        <div className="overflow-auto max-sm:max-w-[350px] ">

        <Table
          loading={{
            spinning: isLoading,
            size: "large", 
          }}
          rowSelection={rowSelection}
          columns={columns}
          dataSource={source}
          pagination={{
            current: currentPage,
            pageSize,
            total: data?.data?.meta?.total,
            onChange: handlePaginationChange,
          }}
        />

        </div>
          <Modal
          title="Title"
          open={open}
          onOk={handleOk}
          confirmLoading={confirmLoading}
          onCancel={handleCancel}
        >
          <p>{modalText}</p>
        </Modal>
    </>
  );
}

export default memo(CustomTable);