import { FC, memo, useState } from "react";
import { Modal, Table, TableColumnsType } from "antd";
import { TableRowSelection } from "antd/es/table/interface";
import { toast } from "react-toastify";
import useFetch from "../hooks/useFetch";
import ActionButtons from "./ActionButtons";
import { request } from "../api/request";
import CustomButton from "./global/CustomButton";


/**
 * ==> props interface
 */
interface IProps {
  cols?:any,
  endPoint?:string
  delEndPoint?:string
}

/**
 * ==> Component
 */
const CustomTable: FC<IProps> = ({cols , endPoint , delEndPoint }) => {

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize,setPageSize] = useState(10);
  const { data, isLoading, refetch } = useFetch(`${endPoint}?page=${currentPage}&per_page=${pageSize}` );

  console.log(data);
  

  
  const columns: TableColumnsType = [
    {
      title: "#", 
      dataIndex: "rowNumber",
      align: "center",
      render: (_: any, __: any, index: number) => (currentPage - 1) * pageSize + index + 1,
      fixed:'left'
    },
    ...cols,
    {
      title: "action",
      dataIndex: "action",
      align: "center",
      responsive: ["xs", "sm", "md", "lg"],
      render: (id:any)=> (
        <ActionButtons id={id} showModal={showModal} />
      ),
      fixed:'right'
    },

  ];

  const source = data?.data?.data?.map((item: any) => {
    const dynamicFields = cols.reduce((acc: any, col: any) => {
      if (col.dataIndex) {
        acc[col.dataIndex] = item[col.dataIndex];
      }
      return acc;
    }, {});
  
    return {
      key: item.id,
      ...dynamicFields,
      action: item.id,
    };
  });

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




  const handlePaginationChange = (page: number, size?: number) => {
    setCurrentPage(page); 
    if (size && size !== pageSize) {
      setPageSize(size); 
    }
    refetch();
  };



    
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState('');
  const [id,setId] = useState('')

  const showModal = (id:any) => {
    setOpen(true);
    setId(id)
    setModalText('are you sure you want to delete this item?')
  };



  const handleOk = async () => {
    setConfirmLoading(true);
    try{
      const res = await request.delete(`/admin/${delEndPoint ? `${delEndPoint}/${id}` : `${endPoint}/${id}`}`)
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

  return (
    <>
          
    <div className="overflow-auto flex-grow  ">
        <div className="flex items-center justify-between mb-4">
          {hasSelected ? 
          <>
            <p>Selected {selectedRowKeys.length} items</p>
            <div className="actions flex items-center gap-2">
              <CustomButton>
                Delete selected
              </CustomButton>
              
            </div>
          </>
           : null}
        </div>
          <Table 
          bordered
          loading={{
            spinning: isLoading,
            size: "large", 
          }}
          dataSource={source}
          rowSelection={rowSelection}
          columns={columns}
          pagination={{
            current: currentPage,
            showSizeChanger: true,
            pageSizeOptions: ["10", "20", "30", "50"],
            pageSize,
            total: data?.data?.meta?.total,
            onChange: handlePaginationChange,
            onShowSizeChange: handlePaginationChange,
            position: ["bottomRight", "bottomCenter"],
            showTotal: (total, range) =>
               
              <span className="text-primary-white">{ `Page ${currentPage} of ${Math.ceil(total / 10)} (${range[0]}-${range[1]} of ${total})`}</span>
             , 
          
          }}
          scroll={{ x: 'max-content'  }}
           />
           <Modal
           centered
          title="Title"
          open={open}
          onOk={handleOk}
          confirmLoading={confirmLoading}
          onCancel={handleCancel}
        >
          <p>{modalText}</p>
        </Modal>

    </div>
      </>
  );
};

export default memo(CustomTable);
