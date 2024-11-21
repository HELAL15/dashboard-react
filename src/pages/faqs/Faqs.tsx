import { FC, memo } from "react";
import { Link } from "react-router-dom";
import SecTitle from "../../components/global/SecTitle";
import CustomTable from "../../components/CustomTable";
import { useTranslation } from "react-i18next";
import { TableColumnsType } from "antd";


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
    <section>
      <div className="container">
        <div className="flex items-center justify-between">
          <SecTitle title="FAQs Page" subTitle="All questions users may ask" />
          <Link to="/faqs/add-faq" className="btn btn-primary">
            Add FAQ
          </Link>
        </div>
        <CustomTable cols={columns} endPoint="faqs" />
      </div>
    </section>
  );
};

export default memo(Faqs);
