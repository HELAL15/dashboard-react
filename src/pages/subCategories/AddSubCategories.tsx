import { FC, memo, useState } from 'react';
import { Select, Spin } from 'antd';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { request } from '../../api/request';
import { useNavigate } from 'react-router';
import CustomButton from '../../components/global/CustomButton';
import useFetch from '../../hooks/useFetch';


/**
 * ==> props interface
 */
interface IProps {}
interface IFormInput {
  title_en: string;
  title_ar: string;
  category_image: FileList;
  parent_id: string;
}




/**
 * ==> Component
 */
const AddSubCategories: FC<IProps> = ({}) => {
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset
  } = useForm<IFormInput>();
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const { data , isLoading:load } = useFetch('categorys');
  const cats = data?.data?.data;


  // Handle file input change
  const handleImageChange = (event: any) => {
    const file = event.target.files?.[0];
    if (file) {
      setValue('category_image', event.target.files);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const [parentID , setParentID ] = useState<string | null>(null)

  const handleChangeSelect = (value:any) => {
    setValue('parent_id',value)
    setParentID(value)
  }

  const navigate = useNavigate();
  // Submit handler
  const onSubmit = async (data: IFormInput) => {
    const formData = new FormData();
    try {
      formData.append('title_en', data.title_en);
      formData.append('title_ar', data.title_ar);
      formData.append('parent_id', data.parent_id);

      if (data.category_image?.length) {
        formData.append('category_image', data.category_image[0]);
      }

      setIsLoading(true);
      const res = await request.post(`admin/categorys?parent_id=${parentID}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setIsLoading(false);
      navigate(`/sub-categories?parent_id=${parentID}`);
      reset();
      toast.success(res.data.message);
    } catch (err: any) {
      setIsLoading(false);

      toast.error(err.response.data.message);
    }
  };
const {Option} = Select;



  return (
    <>
      <section>
        <div className="container">
          <Spin spinning={isLoading || load} size="large" >
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="wrapper grid md:grid-cols-2 gap-4"
            >
              <div className="package md:col-span-2">
                <label htmlFor="" className="label req">
                  select main category
                </label>
                <Select
                loading={load}
                size="large"
                defaultValue={'d'}
                className="w-full"
                onChange={handleChangeSelect}
                virtual={true}
                >
                  <Option disabled selected value="d">Select main category</Option>
                  {cats?.map((cat:any) => (
                    <Option value={cat.id}>{cat.title_en}</Option>
                  ))}
                </Select>
              </div>
              {/* English Title */}
              <div className="package">
                <label className="label req" htmlFor="title_en">
                  {t('title en')}
                </label>
                <input
                 disabled={load}
                  id="title_en"
                  type="text"
                  className="input"
                  placeholder={t('title en placeholder')}
                  {...register('title_en', { required: t('title_required') })}
                />
                {errors.title_en && (
                  <p className="error">{errors.title_en.message}</p>
                )}
              </div>

              {/* Arabic Title */}
              <div className="package">
                <label className="label req" htmlFor="title_ar">
                  {t('title ar')}
                </label>
                <input
                disabled={load}
                  id="title_ar"
                  type="text"
                  className="input"
                  placeholder={t('title_ar_placeholder')}
                  {...register('title_ar', { required: t('title_required') })}
                />
                {errors.title_ar && (
                  <p className="error">{errors.title_ar.message}</p>
                )}
              </div>

              {/* Image Upload */}
              <div className="package md:col-span-2">
                <label className="label req" htmlFor="category_image">
                  {t('category image')}
                </label>
                <input
                 disabled={load}
                  className="input"
                  type="file"
                  id="category_image"
                  onChange={handleImageChange}
                  // {...register("category_image", { required: t("title_required") })}
                />
                {imagePreview && (
                  <div className="mt-4 w-[200px] ">
                    <img
                      src={imagePreview}
                      alt="Image Preview"
                      className="w-full h-full object-contain aspect-video"
                    />
                  </div>
                )}
              </div>

              <CustomButton type="submit" loading={isLoading || load}>
                add sub category
              </CustomButton>
            </form>
          </Spin>
        </div>
      </section>
    </>
  );
};

export default memo(AddSubCategories);
