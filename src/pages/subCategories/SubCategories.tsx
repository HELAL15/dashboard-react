import { FC, memo } from "react";
import { Link, useParams } from "react-router-dom";
import CustomTable from "../../components/CustomTable";
import { useTranslation } from "react-i18next";
import TableImg from "../../components/TableImg";
import CustomButton from "../../components/global/CustomButton";
import { TiPlus } from "react-icons/ti";
import ExportExcel from "../../components/global/ExportExcel";
import TableLink from "../../components/TableLink";

/**
 * ==> props interface
 */
interface IProps {}

/**
 * ==> Component
 */
const SubCategories: FC<IProps> = () => {


  const {i18n} = useTranslation()
  const lang = i18n.language

  const {id} = useParams()
  const endPoint = `categorys?parent_id=${id}`
  const delEndPoint = `categorys`

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
    {
      title: "sizes",
      dataIndex: "css",
      align: "center",
      responsive: ["xs", "sm", "md", "lg"],
      render: ()=>(
        <TableLink title="dd" path="/ff" /> 
      ) ,
    },
  ]
  

  return (
    <>
    <section>
      
      <div className="container">
        <div className="flex items-stretch gap-2 justify-end">
          <Link to="/categories/add-sub-category">
            <CustomButton icon={<TiPlus className="!text-lg" />} >
              Add category
            </CustomButton>
          </Link>
          <ExportExcel/>
        </div>
        <CustomTable
          endPoint={endPoint}
          cols={cols}
          delEndPoint={delEndPoint}
          />
      </div>
    </section>
  </>
  );
};

export default memo(SubCategories);
