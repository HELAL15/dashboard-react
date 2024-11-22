import { FC, memo } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { Select, Switch, Tooltip } from "antd";
import i18next from "i18next";
// import { useTranslation } from "react-i18next";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons';
import { FaShop, FaSun } from "react-icons/fa6";
import { IoMdNotifications } from "react-icons/io";
import { useMediaQuery } from "react-responsive";
import { useTranslation } from "react-i18next";
import { MdDarkMode } from "react-icons/md";
import { useDispatch } from "react-redux";
import { toggleTheme } from "../redux/features/ThemeSlice";
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

  const isMobileOrTablet = useMediaQuery({ query: '(max-width: 991px)' });


  const dispatch = useDispatch()

  const handleChangeTheme = () => {
    dispatch(toggleTheme())
  }


  return (
    <>

      <header className="py-3 sticky top-0 z-20">
        <div className="container  ">
          <div className="flex items-center justify-between py-6 px-4 md:px-6 bg-body-secondary rounded shadow-shadow">
            <div className="flex items-center gap-4 ">
            {
              isMobileOrTablet ?  
              <button  onClick={toggleClose} >
                {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              </button> :
              <button  onClick={toggleCollapsed} >
              {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            </button>
            }
            <Tooltip placement="bottom" title='visit shop' >
              <Link to='https://exclusive15.vercel.app/' target="_blank" className="flex items-center gap-2">
                <FaShop />
                {/* <span className="text-sm">shop</span> */}
              </Link>
            </Tooltip>
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
              <Tooltip title={'theme'} >
                <Switch
                  checkedChildren={<MdDarkMode className="text-lg" />}
                  unCheckedChildren={<FaSun className="text-lg" />}
                  defaultChecked
                  onChange={handleChangeTheme}
                />
              </Tooltip>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}

export default memo(Header);