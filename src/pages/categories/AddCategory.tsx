import { FC, memo, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Spin } from "antd";
import { request } from "../../api/request";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import CustomButton from "../../components/global/CustomButton";
import { TiPlus } from "react-icons/ti";

interface IFormInput {
  title_en: string;
  title_ar: string;
  category_image: FileList;
}

const AddCategory: FC = () => {
  const { t } = useTranslation();
  const { register, handleSubmit, formState: { errors }, setValue , reset } = useForm<IFormInput>();
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isLoading , setIsLoading] = useState(false)

  // Handle file input change
  const handleImageChange = (event:any) => {
    const file = event.target.files?.[0];
    if (file) {
      setValue("category_image", event.target.files); 
      setImagePreview(URL.createObjectURL(file)); 
    }
  };

const navigate = useNavigate()
  // Submit handler
  const onSubmit = async (data: IFormInput) => {
    const formData = new FormData();
    try {
      
      formData.append("title_en", data.title_en);
      formData.append("title_ar", data.title_ar);

     
      if (data.category_image?.length) {
        formData.append("category_image", data.category_image[0]); 
      }

      setIsLoading(true)
      const res = await request.post('admin/categorys', formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        }
      });
      setIsLoading(false)
      navigate('/categories')
      reset()
      // Log response and show success message
      console.log(res);
      toast.success(res.data.message);
    } catch (err:any) {
      console.log(err);
      setIsLoading(false)
      
      toast.error(err.response.data.message);
    }
  };

  return (
    <>
      <section>
        <div className="container">
          <Spin spinning={isLoading} size="large" className="add-category-form">
            <form onSubmit={handleSubmit(onSubmit)} className="wrapper">
              <div className="grid md:grid-cols-2 gap-4">
                {/* English Title */}
                <div className="package">
                  <label className="label req" htmlFor="title_en">{t("title en")}</label>
                  <input
                    id="title_en"
                    type="text"
                    className="input"
                    placeholder={t("title en placeholder")}
                    {...register("title_en", { required: t("title_required") })}
                  />
                  {errors.title_en && <p className="error">{errors.title_en.message}</p>}
                </div>

                {/* Arabic Title */}
                <div className="package">
                  <label className="label req" htmlFor="title_ar">{t("title ar")}</label>
                  <input
                    id="title_ar"
                    type="text"
                    className="input"
                    placeholder={t("title_ar_placeholder")}
                    {...register("title_ar", { required: t("title_required") })}
                  />
                  {errors.title_ar && <p className="error">{errors.title_ar.message}</p>}
                </div>

                {/* Image Upload */}
                <div className="package col-span-2">
                  <label className="label req" htmlFor="category_image">{t("category image")}</label>
                  <input 
                    className="input" 
                    type="file" 
                    id="category_image" 
                    onChange={handleImageChange}
                    // {...register("category_image", { required: t("title_required") })}
                  />
                  {imagePreview && (
                    <div className="mt-4 w-[200px] ">
                      <img src={imagePreview} alt="Image Preview" className="w-full h-full object-contain aspect-video" />
                    </div>
                  )}
                </div>

                <CustomButton 
                loading={isLoading}
                type="submit"
                icon={<TiPlus className="!text-lg" />} >
                add category
                </CustomButton>
              </div>
            </form>
          </Spin>
        </div>
      </section>
    </>
  );
};

export default memo(AddCategory);
