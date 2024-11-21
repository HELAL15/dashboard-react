import { FC, memo } from "react";
import useFetch from "../../hooks/useFetch";
import { useParams } from "react-router";
import { useTranslation } from "react-i18next";
import { Spin } from "antd";
import SecTitle from "../../components/global/SecTitle";
import FaqCard from "../../components/FaqCard";

/**
 * ==> props interface
 */
interface IProps {

}

/**
 * ==> Component
 */
const FAQDetails: FC<IProps> = ({  }) => {

  const {id} = useParams()

  const {i18n } = useTranslation()
    const lang = i18n.language

  const {data,isLoading} = useFetch(`admin/faqs/${id}`)
    const faqs = data

    const question = faqs?.data?.[`question_${lang}`];
    const answer = faqs?.data?.[`answer_${lang}`];


  return (
    <>
    <section>
      <div className="container">
        <SecTitle title="view faq details" />
        <Spin size="large" spinning={isLoading} >
          <div className="wrapper">
            <FaqCard question={question} answer={answer} />
          </div>
        </Spin>
      </div>
    </section>
    </>
  );
}



export default memo(FAQDetails);