import { FC, memo, useState } from "react";
import { Table, TableColumnsType } from 'antd';
import { TableRowSelection } from "antd/es/table/interface";
import { Link } from "react-router-dom";
import { IoEye, IoPencil, IoTrash } from "react-icons/io5";
import SecTitle from "../components/global/SecTitle";
// import { useTranslation } from "react-i18next";

/**
 * ==> props interface
 */
interface IProps {
  columns? : []
}

/**
 * ==> Component
 */
const Test: FC<IProps> = ({ }) => {
  const columns: TableColumnsType = [
    { title: 'Name', dataIndex: 'name' , align:'center' , responsive: ['xs', 'sm', 'md', 'lg'], },
    { title: 'Age', dataIndex: 'age' , align:'center' , responsive: ['xs', 'sm', 'md', 'lg'], },
    { title: 'Address', dataIndex: 'address' , align:'center' ,responsive: ['xs', 'sm', 'md', 'lg'], },
    { title: 'Action', dataIndex: 'action' , align:'center', render: ()=> <Link to={'/'}>ggg</Link> , responsive: ['xs', 'sm', 'md', 'lg'], },
  ];

  const handleDelete = (id:number)=>{
    console.log(id);
  }

  const dataSource = Array.from({ length: 6 }).map((_, i) => ({
    key: i,
    name: `Edward King ${i}`,
    age: 32,
    address: `London, Park Lane no. ${i}`,
    action: 
    <div className="flex items-center justify-center gap-2 flex-wrap">
      {i !== 0 &&<button onClick={()=>handleDelete(i)} className=" rounded px-4 py-3 btn-primary"><IoTrash/></button>}
      <Link to={`/update/${i}`} className=" rounded px-4 py-3 bg-yellow-500"><IoPencil/></Link>
      <Link to={`/view/${i}`} className=" rounded px-4 py-3 bg-primary text-white"><IoEye/></Link>
    </div>
  }));

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

  
  // const {t} = useTranslation()

  return (
    <>
    <section>
      <div className="container overflow-auto">
      <SecTitle title="Latest requests" />
      {hasSelected ? `Selected ${selectedRowKeys.length} items` : null}
      <div className="overflow-auto">
        <Table className="overflow-auto shadow-shadow" 
        rowSelection={rowSelection} 
        columns={columns} 
        dataSource={dataSource} />
      </div>
      </div>
    </section>
    </>
  );
}

export default memo(Test);