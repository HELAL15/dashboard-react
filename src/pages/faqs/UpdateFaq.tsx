import { FC, memo, useEffect, useState } from "react";
import SecTitle from "../../components/global/SecTitle";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { request } from "../../api/request";
import { useNavigate, useParams } from "react-router";
import { Spin } from "antd";
import useFetch from "../../hooks/useFetch";
import BreadCrumb from "../../components/global/BreadCrumb";

/**
 * ==> props interface
 */
interface IProps {

}

interface IFormInput {
  question_en: string;
  question_ar: string;
  answer_en: string;
  answer_ar: string;
}

/**
 * ==> Component
 */
const UpdateFaq: FC<IProps> = ({  }) => {


  const [loading , setLoading] = useState<boolean>(false);

  const navigate = useNavigate()
  const {id} = useParams()

  const { register, handleSubmit, formState: { errors } , setValue , reset } = useForm<IFormInput>();


  const {data , isLoading:load } = useFetch(`admin/faqs/${id}`)

const oldData = data?.data;

useEffect(() => {
  if (oldData) {
    setValue("question_ar", oldData.question_ar);
    setValue("question_en", oldData.question_en);
    setValue("answer_ar", oldData.answer_ar);
    setValue("answer_en", oldData.answer_en);
  }
}, [data]);


  const onSubmit = async (data: IFormInput) => {
    const formData = new FormData();
    try {
      
      formData.append("question_en", data.question_en);
      formData.append("question_ar", data.question_ar);
      formData.append("answer_en", data.answer_en);
      formData.append("answer_ar", data.answer_ar);
      formData.append("_method", 'PUT');

      setLoading(true)
      const res = await request.post(`admin/faqs/${id}`, formData);
      setLoading(false)
      navigate('/faqs')
      reset()
      toast.success(res.data.message);
    } catch (err:any) {
      setLoading(false)
      
      toast.error(err.response.data.message);
    }
  };



  return (
    <>
    <BreadCrumb/>
    <section>
      <div className="container">
        <SecTitle title="add FAQ page" />
          <Spin spinning={loading || load} size="large" >
        <div className="wrapper">
            <form action="" onSubmit={handleSubmit(onSubmit)}>
              <div className="grid grid-cols-2 gap-4 ">
                <div className="package">
                  <label className="label req" htmlFor="question_ar">Question ar</label>
                  <input 
                    className="input" 
                    type="text" 
                    id="question_ar" 
                    placeholder="Question arabic"
                    {...register("question_ar", {
                      required: "Question is required",
                    })}
                    />
                    {errors.question_ar && <p style={{ color: "red" }}>{errors.question_ar.message}</p>}
                </div>
                <div className="package">
                  <label className="label req" htmlFor="question_en">Question en</label>
                  <input 
                    className="input" 
                    type="text" 
                    id="question_en" 
                    placeholder="Question arabic" 
                    {...register("question_en", {
                      required: "Question is required",
                    })}
                    />
                    {errors.question_en && <p style={{ color: "red" }}>{errors.question_en.message}</p>}
                </div>
                <div className="package">
                  <label className="label req" htmlFor="answer_ar">Answer ar</label>
                  <input 
                    className="input" 
                    type="text" 
                    id="answer_ar" 
                    placeholder="Answer"
                    {...register("answer_ar", {
                      required: "Answer is required",
                    })} 
                    />
                    {errors.answer_ar && <p style={{ color: "red" }}>{errors.answer_ar.message}</p>}
                </div>
                <div className="package">
                  <label className="label req" htmlFor="answer_en">Answer en</label>
                  <input 
                    className="input" 
                    type="text" 
                    id="answer_en" 
                    placeholder="Answer"
                    {...register("answer_en", {
                      required: "Answer is required",
                    })} 
                    />
                    {errors.answer_en && <p style={{ color: "red" }}>{errors.answer_en.message}</p>}
                </div>
                <button type="submit" disabled={loading} className="btn btn-primary w-fit col-span-2" >{loading? <Spin/> : 'add faq'}</button>
              </div>
            </form>
        </div>
          </Spin>
      </div>
    </section>
    </>
  );
}

export default memo(UpdateFaq);