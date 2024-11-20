import { FC, memo } from "react";
import { Link } from "react-router-dom";
import SecTitle from "../../components/global/SecTitle";


/**
 * ==> props interface
 */
interface IProps {}

/**
 * ==> Component
 */
const Faqs: FC<IProps> = () => {



  // const columns: TableColumnsType = [

  //   {
  //     title: "Question",
  //     dataIndex: "question",
  //     align: "center",
  //     responsive: ["xs", "sm", "md", "lg"],
  //   },
  //   {
  //     title: "Answer",
  //     dataIndex: "answer",
  //     align: "center",
  //     responsive: ["xs", "sm", "md", "lg"],
  //   },

  // ];


  // const {i18n} = useTranslation()
  // const lang = i18n.language


  // const dataNames = {
  //   question: `question_${lang}`,
  //   answer: `answer${lang}`,
  // }
 
  return (
    <section>
      <div className="container">
        <div className="flex items-center justify-between">
          <SecTitle title="FAQs Page" subTitle="All questions users may ask" />
          <Link to="/faqs/add-faq" className="btn btn-primary">
            Add FAQ
          </Link>
        </div>
        {/* <CustomTable  deleteEndPoint="faqs" cols={columns}  /> */}
      </div>
    </section>
  );
};

export default memo(Faqs);
