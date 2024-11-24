import { Breadcrumb } from "antd";
import { FC, memo } from "react";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";

/**
 * ==> props interface
 */
interface IProps {}

/**
 * ==> Component
 */
const BreadCrumb: FC<IProps> = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const pathSnippets = location.pathname.split('/').filter(i => i);

  const breadcrumbItems = pathSnippets.map((snippet, index) => {
    const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
    const isCurrentPage = index === pathSnippets.length - 1;

    // Check if the snippet is a number
    const isNumber = !isNaN(Number(snippet));
    
    return {
      title: isCurrentPage ? (
        <span className="text-base !text-accent">
          {isNumber ? snippet : t(`breadcrumb.${snippet}`)}
        </span>
      ) : (
        <Link className="text-base font-normal !text-primary hover:!text-primary-white duration-300" to={url}>
          {isNumber ? snippet : t(`breadcrumb.${snippet}`)}
        </Link>
      ),
    };
  });

  return (
    <section>
      <div className="container">
        <Breadcrumb items={[{ title: <Link className="text-base font-normal !text-primary hover:!text-primary-white duration-300 " to="/">{t("breadcrumb.home")}</Link> }, ...breadcrumbItems]} />
      </div>
    </section>
  );
};

export default memo(BreadCrumb);
