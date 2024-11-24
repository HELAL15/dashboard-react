import { FC, memo } from "react";
import { Link } from "react-router-dom";
import CustomTable from "../../components/CustomTable";
import { useTranslation } from "react-i18next";
import { TableColumnsType } from "antd";
import BreadCrumb from "../../components/global/BreadCrumb";
import CustomButton from "../../components/global/CustomButton";
import { TiPlus } from "react-icons/ti";


/**
 * ==> props interface
 */
interface IProps {}

/**
 * ==> Component
 */
const Faqs: FC<IProps> = () => {

  const {i18n} = useTranslation()
  const lang = i18n.language

  const columns: TableColumnsType = [

    {
      title: "Question",
      dataIndex: `question_${lang}`,
      align: "center",
      responsive: ["xs", "sm", "md", "lg"],
      width:250
    },
    {
      title: "Answer",
      dataIndex: `answer_${lang}`,
      align: "center",
      responsive: ["xs", "sm", "md", "lg"],
      width:350
    },

  ];


 
  return (
    <>
      <BreadCrumb/>
      <section>
        <div className="container">
          <div className="flex items-center justify-end">
            
            <Link to="/faqs/add-faq">
              <CustomButton icon={<TiPlus className="!text-lg" />} >
                Add FAQ
              </CustomButton>
            </Link>
          </div>
          <CustomTable cols={columns} endPoint="faqs" />
        </div>
      </section>
    </>
  );
};

export default memo(Faqs);
