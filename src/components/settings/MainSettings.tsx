import { FC, memo, useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import Upload from "../global/Upload";
import useFetch from "../../hooks/useFetch";
import usePostRequest from "../../hooks/usePost";
import { useTranslation } from "react-i18next";

/**
 * ==> props interface
 */
interface IProps {}

interface IFormInput {
  siteNameAr: string;
  siteNameEn: string;
  siteEmail: string;
  phone1: string;
  phone2: string;
  whatsapp: string;
}

interface IPropImgs {
  "site-logo": File | null;
  "footer-logo": File | null;
}

/**
 * ==> Component
 */
const MainSettings: FC<IProps> = ({}) => {
  const { register, handleSubmit, formState: { errors }, setValue } = useForm<IFormInput>({
    defaultValues: {
      siteNameAr: "",
      siteNameEn: "",
      siteEmail: "",
      phone1: "",
      phone2: "",
      whatsapp: "",
    }
  });

  const [imgs, setImgs] = useState<IPropImgs>({
    "site-logo": null,
    "footer-logo": null,
  });

  const {i18n} = useTranslation()

  const lang = i18n.language

  const { data  } = useFetch("https://backend.smartvision4p.com/hotel/public/api/rooms", [lang]);

  useEffect(() => {
    if (data) {
      console.log(data?.data?.data[0].title);
      
      // Set form values from fetched data
      setValue("siteNameAr", data?.data?.data[0].title || "");
      setValue("siteNameEn", data?.data?.data[0].title || "");
      setValue("siteEmail", data?.data?.data?.email || "");
      setValue("phone1", data?.data?.data?.phone1 || "");
      setValue("phone2", data?.data?.data?.phone2 || "");
      setValue("whatsapp", data?.data?.data?.whatsapp || "");
    }
  }, [data, setValue]);

  const handleLogoChange = (file: File | null, e: React.ChangeEvent<HTMLInputElement>) => {
    if (file) {
      setImgs({
        ...imgs,
        [e.target.name]: file,
      });
    }
  };


  const {postData , error , loading} = usePostRequest("https://backend.smartvision4p.com/hotel/public/api/rooms")


  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    console.log("Form submitted");
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value);
    });
    if (imgs["footer-logo"]) formData.append("footer-logo", imgs["footer-logo"]);
    if (imgs["site-logo"]) formData.append("site-logo", imgs["site-logo"]);
    formData.forEach((value, key) => {
      console.log(key, value);
    });

    postData(formData);

  
   


  };

  console.log(error);
  

  if (loading) return <p>Loading...</p>;

  return (
    <section>
      <div className="container">
        <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded px-4 py-8 shadow-shadow">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="package flex flex-col col-span-2 md:col-span-1">
              <label className="label" htmlFor="siteName">Site Name in Arabic</label>
              <input
                type="text"
                id="siteName"
                className="input"
                placeholder="Site Name in Arabic"
                {...register("siteNameAr", { required: "This field is required" })}
              />
              {errors.siteNameAr && <p className="error">{errors.siteNameAr.message}</p>}
            </div>

            <div className="package flex flex-col col-span-2 md:col-span-1">
              <label className="label" htmlFor="siteName1">Site Name in English</label>
              <input
                type="text"
                id="siteName1"
                className="input"
                placeholder="Site Name in English"
                {...register("siteNameEn", { required: "This field is required" })}
              />
              {errors.siteNameEn && <p className="error">{errors.siteNameEn.message}</p>}
            </div>

            <div className="package flex flex-col col-span-2">
              <label className="label" htmlFor="siteEmail">Site Email</label>
              <input
                type="email"
                id="siteEmail"
                className="input"
                placeholder="Site Email"
                {...register("siteEmail", { required: "This field is required" })}
              />
              {errors.siteEmail && <p className="error">{errors.siteEmail.message}</p>}
            </div>

            <div className="package flex flex-col col-span-2 md:col-span-1">
              <label className="label" htmlFor="phone1">Phone Number 1</label>
              <input
                type="tel"
                id="phone1"
                className="input"
                placeholder="Phone Number 1"
                {...register("phone1", { required: "This field is required" })}
              />
              {errors.phone1 && <p className="error">{errors.phone1.message}</p>}
            </div>

            <div className="package flex flex-col col-span-2 md:col-span-1">
              <label className="label" htmlFor="phone">Phone Number 2</label>
              <input
                type="tel"
                id="phone"
                className="input"
                placeholder="Phone Number 2"
                {...register("phone2")}
              />
            </div>

            <div className="package flex flex-col col-span-2">
              <label className="label" htmlFor="whatsapp">WhatsApp</label>
              <input
                type="tel"
                id="whatsapp"
                className="input"
                placeholder="WhatsApp"
                {...register("whatsapp")}
              />
            </div>

            <div className="flex items-center gap-4 col-span-2">
              <div className="package flex flex-col">
                <Upload onFileChange={handleLogoChange} name="site-logo" label="Website Logo" />
              </div>
              <div className="package flex flex-col">
                <Upload onFileChange={handleLogoChange} name="footer-logo" label="Footer Logo" />
              </div>
            </div>
          </div>

          <div className="mt-4">
            <button className="btn btn-primary" type="submit">Send</button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default memo(MainSettings);
