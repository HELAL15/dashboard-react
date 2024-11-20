import { FC, memo } from "react";
import login from "../../assets/login.png";
import { Link } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";

/**
 * ==> Form data interface
 */
interface IFormInput {
  name:string;
  email: string;
  password: string;
  confirmPassword: string;
}

/**
 * ==> Component
 */
const Register: FC = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm<IFormInput>();

  const password = watch("password", "");

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    console.log(data);
    toast.success("Registration successful.");
    reset();
  };

  return (
    <>
      <section>
        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-4">
          <div className="bg-[#CBE4E8] aspect-[12/9] hidden md:block">
            <img
              src={login}
              alt="Register"
              className="object-cover w-full h-full"
            />
          </div>
          <div className="container w-full lg:w-[75%] xl:w-[65%] ">
            <div className="space-y-8">
              <div className="space-y-1">
                <h2 className="text-2xl font-medium">create your account</h2>
                <p className="text-base ">
                  Fill in your details below
                </p>
              </div>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="grid grid-cols-12 gap-4">
                <div className="col-span-12">
                    <input
                      type="text"
                      placeholder="Enter your name"
                      className={`w-full h-[50px] border-b-2 px-4 text-primary placeholder-gray-500 focus:outline-none ${
                        errors.name
                          ? "border-red-500"
                          : "border-gray-300 focus:border-accent"
                      }`}
                      {...register("name", {
                        required: "name is required",
                      })}
                    />
                    {errors.name && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.name.message}
                      </p>
                    )}
                  </div>
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
                        required: "Email is required",
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

                  {/* Password Field */}
                  <div className="col-span-12">
                    <input
                      type="password"
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

                  {/* Confirm Password Field */}
                  <div className="col-span-12">
                    <input
                      type="password"
                      placeholder="Confirm Password"
                      className={`w-full h-[50px] border-b-2 px-4 text-primary placeholder-gray-500 focus:outline-none ${
                        errors.confirmPassword
                          ? "border-red-500"
                          : "border-gray-300 focus:border-accent"
                      }`}
                      {...register("confirmPassword", {
                        required: "Please confirm your password",
                        validate: (value) =>
                          value === password || "Passwords do not match",
                      })}
                    />
                    {errors.confirmPassword && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.confirmPassword.message}
                      </p>
                    )}
                  </div>

                  {/* Submit Button and Login Link */}
                  <div className="col-span-12 flex items-center justify-between mt-4">
                    <button
                      type="submit"
                      className="btn btn-primary w-full"
                    >
                      create account
                    </button>
                    
                  </div>
                  <div className="col-span-12 flex items-center justify-center gap-2">
                    <p className="text-base">
                      Already have an account?
                    </p>
                    <Link
                      className="text-sm font-medium underline"
                      to={"/login"}
                    >
                      Login
                    </Link>
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

export default memo(Register);
