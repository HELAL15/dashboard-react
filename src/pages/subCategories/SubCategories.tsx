import { FC, memo } from "react";
import { Link, useLocation } from "react-router-dom";
// import {  TableColumnsType } from "antd";
import SecTitle from "../../components/global/SecTitle";
import CustomTable from "../../components/CustomTable";
import { useTranslation } from "react-i18next";
import TableImg from "../../components/TableImg";

// import useFetch from "../../hooks/useFetch";

/**
 * ==> props interface
 */
interface IProps {}

/**
 * ==> Component
 */
const SubCategories: FC<IProps> = () => {

  // const {i18n} = useTranslation()
  // const lang = i18n.language


  // const location = useLocation();

  
  // const searchParams = new URLSearchParams(location.search);
  // const parentId = searchParams.get('parent_id');

  // const { data, isLoading, refetch } = useFetch(`categorys?parent_id=${parentId}` );

  // console.log(data);
  

  
  // const columns: TableColumnsType = [

  //   {
  //     title: "title",
  //     dataIndex: `title`,
  //     align: "center",
  //     responsive: ["xs", "sm", "md", "lg"],
  //   },

  //   {
  //     title: "image",
  //     dataIndex: "image",
  //     align: "center",
  //     responsive: ["xs", "sm", "md", "lg"],
  //   },

  //   {
  //     title: "sub categories",
  //     dataIndex: `viewSubCategorys`,
  //     align: "center",
  //     responsive: ["xs", "sm", "md", "lg"],
  //   },
    

  // ];

  const {i18n} = useTranslation()
  const lang = i18n.language

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const parentId = searchParams.get('parent_id');
  const endPoint = `categorys?parent_id=${parentId}`
  console.log(endPoint);

  const cols = [
    {
      title:'main category',
      dataIndex:`parent_title_${lang}`,
      align:'center',
      responsive: ["xs", "sm", "md", "lg"],
    },
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
  ]
  

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
          endPoint={endPoint}
          cols={cols}
          />
      </div>
    </section>
  </>
  );
};

export default memo(SubCategories);
