import { FC, memo, useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu } from 'antd';
import { IoClose } from "react-icons/io5";
// import logo from '../assets/Category-Camera.png';
import {
  ContainerOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { TiPlus } from "react-icons/ti";
import { BiSolidCategory } from "react-icons/bi";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import { useMediaQuery } from 'react-responsive';
import { FaHome, FaUsersCog } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import { FaUsers } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

interface IProps {
  collapsed?: boolean;
  toggleCollapsed?: () => void;
  setCollapsed: (collapsed: boolean) => void;
  close?: boolean;
  toggleClose?: () => void;
  setClose: (close: boolean) => void;
}

type MenuItem = Required<MenuProps>['items'][number];

const items: MenuItem[] = [
  { key: '/', icon: <FaHome /> , label: <NavLink to="/">home</NavLink> },
  { key: '/settings', icon: <IoMdSettings /> , label: <NavLink to="/settings">settings</NavLink> },
  {
    key: 'sub1',
    label: 'admins',
    icon: <FaUsersCog />,
    children: [
      { key: '/admins', icon:<FaUsersCog /> , label: <NavLink to="/admins">all admins</NavLink> },
      { key: '/add-admin', icon: <TiPlus /> , label: <NavLink to="/add-admin">add admin</NavLink> },
    ],
  },
  {
    key: 'sub2',
    label: 'users',
    icon: <FaUsers />,
    children: [
      { key: '/users', icon:<FaUsers /> , label: <NavLink to="/users">all users</NavLink> },
      { key: '/add-user', icon: <TiPlus /> , label: <NavLink to="/add-user">add user</NavLink> },
    ],
  },
  {
    key: 'sub3',
    label: 'categories',
    icon: <BiSolidCategory />,
    children: [
      
      { key: '/categories', icon:<BiSolidCategory /> , label: <NavLink to="/categories">all categories</NavLink> },
      { key: '/categories/add-category', icon: <TiPlus /> , label: <NavLink to="/categories/add-category">add category</NavLink> },
    ],
  },
  {
    key: 'sub4',
    label: 'products',
    icon: <MdOutlineProductionQuantityLimits />,
    children: [
      { key: '/products', icon:<MdOutlineProductionQuantityLimits /> , label: <NavLink to="/products">all products</NavLink> },
      { key: '/add-product', icon: <TiPlus /> , label: <NavLink to="/add-product">add product</NavLink> },
    ],
  },
  {
    key: 'sub5',
    label: 'FAQS',
    icon: <FaUsers />,
    children: [
      { key: '/faqs', icon:<FaUsers /> , label: <NavLink to="/faqs">all faqs</NavLink> },
      { key: '/faqs/add-faq', icon: <TiPlus /> , label: <NavLink to="/faqs/add-faq">add faq</NavLink> },
    ],
  },
  { key: '/orders', icon: <ContainerOutlined />, label: <NavLink to="/orders">orders</NavLink> },
];

const Aside: FC<IProps> = ({ collapsed, setClose , toggleClose , close }) => {
  const location = useLocation();
  const [selectedKey, setSelectedKey] = useState<string>(location.pathname);
  const isMobileOrTablet = useMediaQuery({ query: '(max-width: 768px)' });
  useEffect(() => {
    setSelectedKey(location.pathname);
    setClose(false)
  }, [location , isMobileOrTablet]);


  
  const {setting} = useSelector((state:RootState)=>state.setting)
  const {
    site_name:siteName 
  } = setting
  
  
  const user = useSelector((state:RootState)=>state.user.data)
  const {
    name,
    photo_profile:avatar
  } = user
  

  return (
    <aside className={` flex flex-col pb-5 fixed lg:sticky overflow-hidden top-0 ${close ? "inset-x-0" : "inset-x-[-100%]"} lg:inset-x-0 shadow-shadow h-screen z-50 bg-white duration-300 w-[95%] md:w-[40%] ${collapsed ? 'lg:w-fit ' : 'lg:w-[20%]'} flex-shrink-0`}>
      <div className="logo font-bold text-2xl py-2 md:py-4 px-3 mt-1 border-b border-b-slate-200 flex items-center justify-between">
        <Link to="/" className="lg:mx-auto text-accent">
          <h1 className={collapsed ? " text-xs " : "text-xl font-bold"}>{siteName}</h1>
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
          theme="light"
          inlineCollapsed={collapsed}
          items={items}
          className="w-full"
        />
      </nav>
        <NavLink to="profile" className='flex items-center justify-center gap-2 mt-6  '>
          <img src={avatar} className="w-[50px] h-[50px] rounded-full object-cover " />
          <p className={collapsed ? "hidden" : ""}>{name}</p>
        </NavLink>
    </aside>
  );
}

export default memo(Aside);
