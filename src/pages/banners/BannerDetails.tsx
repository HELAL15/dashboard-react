import { FC, memo } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router";
import useFetch from "../../hooks/useFetch";
import { Spin } from "antd";

/**
 * ==> props interface
 */
interface IProps {

}

/**
 * ==> Component
 */
const BannerDetails: FC<IProps> = ({  }) => {

  const {id} = useParams();
  const {i18n} = useTranslation()
  const lang = i18n.language

  const { data, isLoading } = useFetch(`admin/banners/${id}`);

    const banner = data

    const title = banner?.data?.[`title_${lang}`];
    const image = banner?.data?.[`banner_image`];

  return (
    <>

    <section>
      <div className="container">
        <Spin spinning={isLoading} >
          <div className="wrapper grid grid-cols-1 gap-4">
            <div className="package">
              <label className="label" htmlFor="title">title</label>
              <p className="input">{title}</p>
            </div>
            <div className="package">
              <label className="label" htmlFor="image">banner image</label>
              <img src={image} alt={title} className="w-32 h-32 object-cover" />
            </div>
          </div>
        </Spin>
      </div>
    </section>

    </>
  );
}

export default memo(BannerDetails);