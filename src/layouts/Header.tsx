import { FC, memo } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { Select } from "antd";
import i18next from "i18next";
// import { useTranslation } from "react-i18next";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons';
import { FaShop } from "react-icons/fa6";
import { IoMdNotifications } from "react-icons/io";
import { useMediaQuery } from "react-responsive";
import { useTranslation } from "react-i18next";
/**
 * ==> props interface
 */
interface IProps {
  collapsed: boolean;
  toggleCollapsed: () => void;
  toggleClose: () => void;

}

/**
 * ==> Component
 */
const Header: FC<IProps> = ({ collapsed ,  toggleCollapsed , toggleClose }) => {
  
  // const {t} = useTranslation()

  const navigate = useNavigate()
  const location = useLocation()



  const {Option} = Select

  const {i18n} = useTranslation()

  const handleOptionChange = (value: any) => {
    i18next.changeLanguage(value);
    i18n.changeLanguage(value)
    // window.location.reload();
    navigate(location.pathname , {replace: true})
    console.log(`selected ${value}`)
   

  }

  // const lang = i18next.language

  const isMobileOrTablet = useMediaQuery({ query: '(max-width: 768px)' });

  return (
    <>

      <header className="py-3 sticky top-0   z-20">
        <div className="container  ">
          <div className="flex items-center justify-between py-6 px-4 md:px-6 bg-primary-white rounded shadow-shadow">
            <div className="flex items-center gap-4 ">
            {
              isMobileOrTablet ?  <button  onClick={toggleClose} >
                {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              </button> :
              <button  onClick={toggleCollapsed} >
              {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            </button>
            }
              <Link to='https://exclusive15.vercel.app/' target="_blank" className="flex items-center gap-2">
                <FaShop />
                <span className="text-sm">shop</span>
              </Link>
            </div>
            <div className="flex items-center gap-1 md:gap-4">
                <Select
                  defaultValue={localStorage.getItem("i18nextLng") || 'ar'}
                  style={{ width: 90 , height:24 }}
                  onChange={handleOptionChange}
                  className=" select-lang"
                >
                  {/* {t("topHeader.lang.en")} */}
                <Option value="en">english</Option>
                <Option value="ar">العربية</Option>
              </Select>
              <NavLink className="text-lg md:text-xl font-medium" to={'/notifications'}>
                <IoMdNotifications />
              </NavLink>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}

export default memo(Header);