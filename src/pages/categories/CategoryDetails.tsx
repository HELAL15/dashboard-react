import { FC, memo } from "react";
import useFetch from "../../hooks/useFetch";
import { useParams } from "react-router";
import { useTranslation } from "react-i18next";
import { Spin } from "antd";
import BreadCrumb from "../../components/global/BreadCrumb";

/**
 * ==> props interface
 */
interface IProps {

}

/**
 * ==> Component
 */
const CategoryDetails: FC<IProps> = ({  }) => {
  const {id} = useParams();
  const {i18n} = useTranslation()
  const lang = i18n.language

  const { data, isLoading } = useFetch(`admin/categorys/${id}`);

  const categoryDetails = data?.data;
  console.log(categoryDetails);
  
  const title = categoryDetails && categoryDetails[`title_${lang}`];

  return (
    <>
    <BreadCrumb/>
    <section>
      <div className="container">
        <Spin size="large" spinning={isLoading} >
          <div className="wrapper">
            <h3>
              category title: 
              {title}
              </h3>
          </div>
        </Spin>
      </div>
    </section>
    </>
  );
}

export default memo(CategoryDetails);