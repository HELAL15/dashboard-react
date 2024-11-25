import { FC, memo } from "react";
import { Link } from "react-router-dom";
import { TableColumnsType } from "antd";
import { useTranslation } from "react-i18next";
import { MdCategory } from "react-icons/md";
import TableLink from "../../components/TableLink";
import TableImg from "../../components/TableImg";
import CustomTable from "../../components/CustomTable";
import CustomButton from "../../components/global/CustomButton";
import { TiPlus } from "react-icons/ti";
import ExportExcel from "../../components/global/ExportExcel";

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

  
  const columns: TableColumnsType = [

    {
      title: "title",
      dataIndex: `title_${lang}`,
      align: "center",
      responsive: ["xs", "sm", "md", "lg"],
    },

    {
      title: "image",
      dataIndex: "category_image",
      align: "center",
      responsive: ["xs", "sm", "md", "lg"],
      render: (image:any)=>(
        <TableImg image={image} /> 
      ) ,
    },

    {
      title: "sub categories",
      dataIndex: `id`,
      align: "center",
      responsive: ["xs", "sm", "md", "lg"],
      render: (id:any) =>  
       <TableLink 
        icon={<MdCategory />} 
        title="view sub category" 
        path={`/categories/${id}/sub-categories`} 
        />
    },


  ];





  return (
    <>
    <section>
      
      <div className="container">

        <div className="flex items-stretch gap-2 justify-end">
          <Link to="/categories/add-category">
            <CustomButton icon={<TiPlus className="!text-lg" />} >
            Add category
            </CustomButton>
          </Link>
          <ExportExcel/>
        </div>
        <CustomTable cols={columns} endPoint="categorys"  />
      </div>
    </section>
      </>
  );
};

export default memo(Categories);
