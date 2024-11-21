import { FC, memo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";
import { request } from "../../api/request";
import { Spin } from "antd";
import { setToken } from "../../helpers/Utils";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../redux/features/UserSlice";
import { RootState } from "../../redux/store";
import { jwtDecode } from "jwt-decode";

/**
 * ==> Form data interface
 */
interface IFormInput {
  email: string;
  password: string;
}

/**
 * ==> Component
 */
const Login: FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IFormInput>();


  const {setting} = useSelector((state:RootState)=>state.setting)
  const {
    site_name:siteName 
  } = setting


  const [loading , setLoading] = useState(false)


  const navigate = useNavigate();
  const dispatch = useDispatch()

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    const formData = new FormData();
    formData.append("email" , data.email)
    formData.append("password" , data.password)
    formData.append("account_type" , "admin")
    try{
      setLoading(true)
      const res = await request.post('user/login' , formData);
      setLoading(false)
      toast.success(res.data.message)
      // handleLogin(res?.data.data)
      const token = res.data.data.token
      const decoded: any = jwtDecode(token);
      const remainingTimeInSeconds = decoded.exp - Math.floor(Date.now() / 1000);
      const remainingTimeInMinutes = Math.floor(remainingTimeInSeconds / 60);
      setToken("accessTokenAdmin",token , remainingTimeInMinutes )
      dispatch(setUser(res?.data.data))
      request.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      navigate('/')
      reset();
    }catch(err:any){
      setLoading(false)
      console.log(err);
      toast.error(err.response.data.message)
    }
  };

  return (
    <>
      <section className="h-screen p-0 m-0 grid place-items-center gap-4  bg-body ">
          <div className=" space-y-8 w-[95%] md:w-[50%] lg:w-[35%] shadow-md
            bg-primary-white py-10 px-4 rounded-md">
              <div className="space-y-2 text-center">
                <h2 className="text-3xl font-medium text-accent">{siteName}</h2>
                <p className="text-base text-primary">admin dashboard</p>
              </div>
              <Spin spinning={loading} size="large" >
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="grid grid-cols-12 gap-4">
                    <div className="col-span-12">
                      <input
                        type="text"
                        autoComplete="true"
                        placeholder="enter your email"
                        className={`w-full h-[50px] border-b-2 px-4 text-primary placeholder-gray-500 focus:outline-none ${
                          errors.email
                            ? "border-red-500"
                            : "border-gray-300 focus:border-accent"
                        }`}
                        {...register("email", {
                          required: "This field is required",
                          pattern: {
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message: "Please enter a valid email address",
                          },
                        })}
                      />
                      {errors.email && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.email.message}
                        </p>
                      )}
                    </div>
                    <div className="col-span-12">
                      <input
                        type="password"
                        autoComplete="true"
                        placeholder="Password"
                        className={`w-full h-[50px] border-b-2 px-4 text-primary placeholder-gray-500 focus:outline-none ${
                          errors.password
                            ? "border-red-500"
                            : "border-gray-300 focus:border-accent"
                        }`}
                        {...register("password", {
                          required: "Password is required",
                          minLength: {
                            value: 6,
                            message: "Password must be at least 6 characters",
                          },
                        })}
                      />
                      {errors.password && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.password.message}
                        </p>
                      )}
                    </div>
                    <div className="col-span-12 flex items-center justify-center">
                      <button 
                      type="submit"
                      disabled={loading}
                      className="w-fit  min-w-[150px] btn btn-primary
                     disabled:bg-slate-500 
                     disabled:cursor-not-allowed">{loading ? <Spin/> : 'Login'}</button>
                      
                    </div>
                  </div>
                </form>
              </Spin>
           
          </div>
     
      </section>
    </>
  );
};

export default memo(Login);
