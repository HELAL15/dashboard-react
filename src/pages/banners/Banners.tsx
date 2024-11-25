import { TableColumnsType } from "antd";
import { FC, memo } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import CustomButton from "../../components/global/CustomButton";
import { TiPlus } from "react-icons/ti";
import CustomTable from "../../components/CustomTable";
import TableImg from "../../components/TableImg";

/**
 * ==> props interface
 */
interface IProps {

}

/**
 * ==> Component
 */
const Banners: FC<IProps> = ({  }) => {


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
      title: "banner image",
      dataIndex: `banner_image`,
      align: "center",
      responsive: ["xs", "sm", "md", "lg"],
      render: (image:any)=>(
        <TableImg image={image} /> 
      ) ,
    },

  ];



  return (
    <>
    <section>
      <div className="container">
        <div className="flex items-center justify-end">
            
            <Link to="/banners/add-banner">
              <CustomButton icon={<TiPlus className="!text-lg" />} >
                Add banner
              </CustomButton>
            </Link>
          </div>
          <CustomTable cols={columns} endPoint="banners" />

      </div>
    </section>
    </>
  );
}

export default memo(Banners);