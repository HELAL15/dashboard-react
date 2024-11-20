import { FC, memo } from "react";
import login from "../../assets/login.png";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

/**
 * ==> Form data interface
 */
interface IFormInput {
  email: string;
}

/**
 * ==> Component
 */
const ForgetPassword: FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IFormInput>();

  const navigate = useNavigate()

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    console.log(data);
    toast.success("Password reset link sent to your email.");
    reset();
    navigate("/otp")
  };

  return (
    <>
      <section>
        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-4">
          <div className="bg-[#CBE4E8] aspect-[12/9] hidden md:block">
            <img
              src={login}
              alt="Forget Password"
              className="object-cover w-full h-full"
            />
          </div>
          <div className="container w-full lg:w-[75%] xl:w-[65%] ">
            <div className="space-y-8">
              <div className="space-y-1">
                <h2 className="text-2xl font-medium">Forgot Password?</h2>
                <p className="text-base text-gray-600">
                  Enter your email address below to receive the code reset .
                </p>
              </div>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="grid grid-cols-12 gap-4">
                  {/* Email Field */}
                  <div className="col-span-12">
                    <input
                      type="email"
                      placeholder="Enter your email"
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

                  {/* Submit Button */}
                  <div className="col-span-12 flex items-center justify-between mt-4">
                    <button
                      type="submit"
                      className="btn btn-primary w-full"
                    >
                      Send code
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default memo(ForgetPassword);
