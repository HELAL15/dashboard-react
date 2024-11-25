import { FC, memo, useState } from "react";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { request } from "../../api/request";
import { useNavigate } from "react-router";
import { Spin } from "antd";
import CustomButton from "../../components/global/CustomButton";
import { TiPlus } from "react-icons/ti";

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
const AddFaqs: FC<IProps> = ({  }) => {


  const [loading , setLoading] = useState<boolean>(false);

  const navigate = useNavigate()

  const { register, handleSubmit, formState: { errors } , reset } = useForm<IFormInput>();


  const onSubmit = async (data: IFormInput) => {
    const formData = new FormData();
    try {
      
      formData.append("question_en", data.question_en);
      formData.append("question_ar", data.question_ar);
      formData.append("answer_en", data.answer_en);
      formData.append("answer_ar", data.answer_ar);


      setLoading(true)
      const res = await request.post('admin/faqs', formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        }
      });
      setLoading(false)
      navigate('/faqs')
      reset()
      // Log response and show success message
      console.log(res);
      toast.success(res.data.message);
    } catch (err:any) {
      console.log(err);
      setLoading(false)
      
      toast.error(err.response.data.message);
    }
  };



  return (
    <>
    <section>
      <div className="container">
          <Spin spinning={loading} size="large" >
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
                <CustomButton 
                icon={<TiPlus className="!text-lg" />} 
                loading={loading} 
                className="col-span-2" 
                type="submit"
                >
                  add faq
                </CustomButton>
              </div>
            </form>
        </div>
          </Spin>
      </div>
    </section>
    </>
  );
}

export default memo(AddFaqs);