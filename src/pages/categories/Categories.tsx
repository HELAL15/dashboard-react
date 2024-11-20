import { FC, memo, useState } from "react";
import { Link } from "react-router-dom";
import { Modal, Table, TableColumnsType } from "antd";
import { IoEye, IoPencil, IoTrash } from "react-icons/io5";
import useFetch from "../../hooks/useFetch";
import SecTitle from "../../components/global/SecTitle";
import { TableRowSelection } from "antd/es/table/interface";
import { FaFileExcel } from "react-icons/fa6";
import { useTranslation } from "react-i18next";
import { request } from "../../api/request";
import { toast } from "react-toastify";
import CustomTable from "../../components/CustomTable";

/**
 * ==> props interface
 */
interface IProps {}

/**
 * ==> Component
 */
const Categories: FC<IProps> = () => {

  const {i18n} = useTranslation()
  const lang = i18n.language

  const { data, isLoading, refetch } = useFetch(`categorys?page=${1}` );


  
  const columns: TableColumnsType = [

    {
      title: "title",
      dataIndex: `title`,
      align: "center",
      responsive: ["xs", "sm", "md", "lg"],
    },

    {
      title: "image",
      dataIndex: "image",
      align: "center",
      responsive: ["xs", "sm", "md", "lg"],
    },

    {
      title: "sub categories",
      dataIndex: `viewSubCategorys`,
      align: "center",
      responsive: ["xs", "sm", "md", "lg"],
    },
    

  ];
  return (
    <>
    <section>
      
      <div className="container">
        <div className="flex items-center justify-between">
          <SecTitle title="categories Page" subTitle="All categories in store" />
          <Link to="/categories/add-category" className="btn btn-primary">
            Add category
          </Link>
        </div>
        <CustomTable 
          
          deleteEndPoint="categorys" 
          cols={columns} 
          data={data}
          isLoading={isLoading}
          refetch={refetch}
          />
      </div>
    </section>
            </>
  );
};

export default memo(Categories);
