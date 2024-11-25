import { FC, memo, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Spin } from "antd";
import { request } from "../../api/request";
import { useNavigate, useParams } from "react-router";
import useFetch from "../../hooks/useFetch";
import { toast } from "react-toastify";
import CustomButton from "../../components/global/CustomButton";

interface IFormInput {
  title_en: string;
  title_ar: string;
  category_image: FileList;
}

const UpdateCateogry: FC = () => {
  const { t } = useTranslation();
  const {id} = useParams();

  const { data, isLoading: load } = useFetch(`admin/categorys/${id}`);

  const oldData = data?.data;

  const { register, handleSubmit, formState: { errors }, setValue, reset } = useForm<IFormInput>();
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (oldData) {
      setImagePreview(oldData.category_image);
      setValue("title_ar", oldData.title_ar);
      setValue("title_en", oldData.title_en);
      // setValue("category_image" , oldData?.category_image)
    }
  }, [data]);

  // Handle file input change
  const handleImageChange = (event: any) => {
    const file = event.target.files?.[0];
    if (file) {
      setValue("category_image", event.target.files);
      setImagePreview(URL.createObjectURL(file));
    } else {
      setImagePreview(null); 
    }
  };

  const navigate = useNavigate();

  // Submit handler
  const onSubmit = async (data: IFormInput) => {
    const formData = new FormData();
    try {
      formData.append("title_en", data.title_en);
      formData.append("title_ar", data.title_ar);
      
      formData.append("_method", 'PUT');

      if( data.category_image?.length) {
        formData.append("category_image", data.category_image[0]);
      }

      setIsLoading(true);

      const res = await request.post(`admin/categorys/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setIsLoading(false);
      navigate('/categories');
      reset(); 
      toast.success(res.data.message);
    } catch (err) {
      setIsLoading(false);
      toast.error("Error while updating category");
    }
  };

  return (
    <>
      <section>
        <div className="container">
          <Spin spinning={isLoading ? isLoading : load} size="large" className="add-category-form">
            <form onSubmit={handleSubmit(onSubmit)} className="wrapper">
              <div className="grid grid-cols-2 gap-4">
                {/* English Title */}
                <div className="package">
                  <label className="label req" htmlFor="title_en">{t("title en")}</label>
                  <input
                    id="title_en"
                    type="text"
                    defaultValue={oldData?.title_en}
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
                    defaultValue={oldData?.title_ar}
                    type="text"
                    className="input"
                    placeholder={t("title ar placeholder")}
                    {...register("title_ar", { required: t("title_required") })}
                  />
                  {errors.title_ar && <p className="error">{errors.title_ar.message}</p>}
                </div>

                {/* Image Upload */}
                <div className="package col-span-2">
                  <label className="label" htmlFor="category_image">{t("category image")}</label>
                  <input
                    className="input"
                    type="file"
                    id="category_image"
                    onChange={handleImageChange}
                  />
                  {imagePreview && (
                    <div className="mt-4 w-[200px] ">
                      <img src={imagePreview} alt="Image Preview" className="w-full h-full object-contain aspect-video" />
                    </div>
                  )}
                </div>

                <CustomButton loading={isLoading} type="submit" className="col-span-2" >
                  update
                </CustomButton>


              </div>

            </form>
          </Spin>
        </div>
      </section>
    </>
  );
};

export default memo(UpdateCateogry);
