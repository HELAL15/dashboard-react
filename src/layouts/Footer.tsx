import { ChangeEvent, FC, FormEvent, memo, useState } from "react";
import { FaInstagram } from "react-icons/fa";
import { Link, NavLink } from "react-router-dom";
import qr from '../assets/Qrcode.png';
import appstore from '../assets/appstore.png';
import playstore from '../assets/google-play.png';
import { RiFacebookLine, RiLinkedinLine } from "react-icons/ri";
import { FaXTwitter } from "react-icons/fa6";
import { VscSend } from "react-icons/vsc";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

/**
 * ==> props interface
 */
interface IProps {

}

/**
 * ==> Component
 */
const Footer: FC<IProps> = ({  }) => {

  const [mail , setMail] = useState('')

  const handleMailChange = (e:ChangeEvent<HTMLInputElement>)=>{
    setMail(e.target.value)
  }

  const handleSubmitMail = (e:FormEvent<HTMLFormElement>)=>{
    e.preventDefault()
    if(mail !==''){
      toast.success(mail)
    }
    setMail('')
  }

  const {t} = useTranslation()

  return (
    <>
    <footer className="py-4 ">
      <div className="container">
        <div className="rights text-sm flex items-center justify-between bg-white shadow-shadow py-5 px-4 rounded sticky bottom-0 ">
          <p className="">Hand-crafted & Made by ENG/ AHMED HELAL</p>
          <p>COPYRIGHT © 2024</p>
        </div>
      </div>
    </footer>
    </>
  );
}

export default memo(Footer);