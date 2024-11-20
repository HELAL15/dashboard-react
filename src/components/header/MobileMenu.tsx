import { FC, memo } from "react";
import { useTranslation } from "react-i18next";
import { IoClose } from "react-icons/io5";
import { Link, NavLink } from "react-router-dom";

/**
 * ==> props interface
 */
interface IProps {
  isOpen?:boolean;
  setOpen?:any;
}

/**
 * ==> Component
 */
const MobileMenu: FC<IProps> = ({ isOpen , setOpen }) => {



  const handleClose =()=>{
    setOpen(false);
  }

const {t} = useTranslation()


  return (
    <>
      <div className={`menu fixed top-0 ${isOpen ? "rtl:right-0 ltr:left-0" : "rtl:-right-full ltr:-left-full"} duration-200 w-full px-4 py-8 md:w-1/2 z-30 h-screen bg-primary-white shadow-shadow`}>
        <div className="container">
          <div className="flex items-center justify-between gap-2">
            <div className="logo font-bold text-2xl">
              <Link to="/">exclusive</Link>
            </div>
            <button onClick={handleClose} className="text-3xl font-bold">
              <i><IoClose /></i>
            </button>
          </div>
          <nav className="links">
            <ul className="flex flex-col gap-6 mt-12">
              <li className="nav-item">
                <NavLink className="nav-link-mobile" to="/">{t("header.nav.home")}</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link-mobile" to="/shop">{t("header.nav.shop")}</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link-mobile" to="/contact">{t("header.nav.contact")}</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link-mobile" to="/about">{t("header.nav.about")}</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link-mobile" to="/login">{t("header.nav.login")}</NavLink>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
}

export default memo(MobileMenu);