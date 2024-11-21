import { FC, memo } from "react";
import { Link } from "react-router-dom";
import { TableColumnsType } from "antd";
import SecTitle from "../../components/global/SecTitle";
import { useTranslation } from "react-i18next";
import { MdCategory } from "react-icons/md";
import TableLink from "../../components/TableLink";
import TableImg from "../../components/TableImg";
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
      render: (image:any)=> <TableImg image={image} /> ,
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
        path={`/sub-categories?parent_id=${id}`} 
        />
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
        <CustomTable cols={columns} endPoint="categorys"  />
      </div>
    </section>
      </>
  );
};

export default memo(Categories);
