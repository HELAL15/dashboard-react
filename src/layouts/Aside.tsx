import { FC, memo, useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, Tooltip } from 'antd';
import { IoClose } from "react-icons/io5";
import type { MenuProps } from 'antd';
import { TiPlus } from "react-icons/ti";
import { BiSolidCategory } from "react-icons/bi";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import { useMediaQuery } from 'react-responsive';
import { FaHome, FaUsersCog } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import { FaClipboardQuestion, FaUsers } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import Gravatar from 'react-gravatar'
import { useTranslation } from "react-i18next";


interface IProps {
  collapsed?: boolean;
  toggleCollapsed?: () => void;
  setCollapsed: (collapsed: boolean) => void;
  close?: boolean;
  toggleClose?: () => void;
  setClose: (close: boolean) => void;
}

type MenuItem = Required<MenuProps>['items'][number];



const Aside: FC<IProps> = ({ collapsed, setClose , toggleClose , close }) => {
  const location = useLocation();
  const [selectedKey, setSelectedKey] = useState<string>(location.pathname);
  const isMobileOrTablet = useMediaQuery({ query: '(max-width: 991px)' });
  useEffect(() => {
    setSelectedKey(location.pathname);
    setClose(false)
  }, [location , isMobileOrTablet]);

  const {t} = useTranslation()

  const items: MenuItem[] = [
    { key: '/', icon: <FaHome className="!text-lg" /> , label: <NavLink className={'text-sm font-normal'} to="/">{t('aside.home')}</NavLink> },
    { key: '/settings', icon: <IoMdSettings className="!text-lg" /> , label: <NavLink className={'text-sm font-normal'} to="/settings">{t('aside.settings')}</NavLink> },
    {
      key: 'sub1',
      label: <span className="text-base font-normal" >{t("aside.admins.index")}</span>,
      icon: <FaUsersCog className="!text-lg" />,
      children: [
        { key: '/admins', icon:<FaUsersCog className="!text-lg" /> , 
          label: <NavLink className={'text-sm font-normal'} to="/admins">{t("aside.admins.all")}</NavLink> },
        { key: '/admins/add-admin', icon: <TiPlus className="!text-lg" /> , 
          label: <NavLink className={'text-sm font-normal'} to="/admins/add-admin">{t("aside.admins.add")}</NavLink> },
      ],
    },
    {
      key: 'sub2',
      label: <span className="text-base font-normal" >{t("aside.users.index")}</span>,
      icon: <FaUsers className="!text-lg" />,
      children: [
        { key: '/users', icon:<FaUsers className="!text-lg" /> , 
          label: <NavLink className={'text-sm font-normal'} to="/users">{t("aside.users.all")}</NavLink> },
        { key: '/users/add-user', icon: <TiPlus className="!text-lg" /> , 
          label: <NavLink className={'text-sm font-normal'} to="/users/add-user">{t("aside.users.add")}</NavLink> },
      ],
    },
    {
      key: 'sub3',
      label: <span className="text-base font-normal" >{t('aside.categories.index')}</span>,
      icon: <BiSolidCategory className="!text-lg" />,
      children: [
        
        { key: '/categories', icon:<BiSolidCategory className="!text-lg" /> ,
           label: <NavLink className={'text-sm font-normal'} to="/categories">{t('aside.categories.all')}</NavLink> },
        { key: '/categories/add-category', icon: <TiPlus className="!text-lg" /> ,
           label: <NavLink className={'text-sm font-normal'} to="/categories/add-category">{t('aside.categories.add')}</NavLink> },
      ],
    },
    {
      key: 'sub4',
      label: <span className="text-base font-normal" >{t("aside.products.index")}</span>,
      icon: <MdOutlineProductionQuantityLimits className="!text-lg" />,
      children: [
        { key: '/products', icon:<MdOutlineProductionQuantityLimits className="!text-lg" /> ,
           label: <NavLink className={'text-base font-normal'} to="/products">{t("aside.products.all")}</NavLink> },
        { key: '/add-product', icon: <TiPlus className="!text-lg" /> ,
           label: <NavLink className={'text-base font-normal'} to="/add-product">{t("aside.products.add")}</NavLink> },
      ],
    },
    {
      key: 'sub5',
      label: <span className="text-base font-normal" >{t("aside.faqs.index")}</span>,
      icon: <FaClipboardQuestion className="!text-lg" />,
      children: [
        { key: '/faqs', icon:<FaClipboardQuestion className="!text-lg" /> ,
           label: <NavLink className={'text-sm font-normal'} to="/faqs">{t("aside.faqs.all")}</NavLink> },
        { key: '/faqs/add-faq', icon: <TiPlus className="!text-lg" /> ,
           label: <NavLink className={'text-sm font-normal'} to="/faqs/add-faq">{t("aside.faqs.add")}</NavLink> },
      ],
    },

  ];
  
  const {setting} = useSelector((state:RootState)=>state.setting)
  const {
    site_name:siteName 
  } = setting
  
  
  const user = useSelector((state:RootState)=>state.user.data)
  const {
    name,
    email
  } = user


  return (
    <aside className={` flex flex-col pb-5 fixed lg:sticky overflow-hidden top-0 
    ${close ? "inset-x-0" : "inset-x-[-100%]"} lg:inset-x-0 shadow-shadow h-screen z-50 bg-body-secondary duration-300 w-[95%] md:w-[40%] 
    ${collapsed ? 'lg:w-fit ' : 'lg:w-[18%]'} 
    flex-shrink-0`}>
      <div className="logo font-bold text-2xl py-6 px-3 mt-1 border-b border-b-slate-200 flex items-center justify-between">
        <Link to="/" className="lg:mx-auto text-accent">
          <h1 className={collapsed ? " text-sm" : "text-xl font-bold"}>{siteName}</h1>
          {/* <img 
          src={"https://trello.com/1/cards/65ba872e35db8e7e4c01f5c7/attachments/6627f8e0fc82bf3f27e64cb5/previews/6627f8e1fc82bf3f27e64d92/download/logo.png"} 
          alt="" className={`${collapsed ? 'w-[50px]' : 'w-[150px]' }  h-[45px] object-contain`} /> */}
        </Link>
        <button onClick={toggleClose} className="block lg:hidden">
          <IoClose />
        </button>
      </div>
      <nav className=" flex-grow overflow-y-auto">
        <Menu
          selectedKeys={[selectedKey]} 
          mode="inline"
          inlineCollapsed={collapsed}
          items={items}
          className="w-full"
        />
      </nav>
      <Tooltip title="profile" placement="top"  >
        <NavLink to="/profile" className='flex items-center justify-center gap-2 mt-6 navlink-profile '>
          <Gravatar default="mm" className="rounded-full avatar " email={email} />
          <p className={collapsed ? "hidden" : ""}>{name}</p>
        </NavLink>
      </Tooltip>
    </aside>
  );
}

export default memo(Aside);
