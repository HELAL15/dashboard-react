import { FC, memo } from "react";
import login from "../../assets/login.png";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

/**
 * ==> Form data interface
 */
interface IFormInput {
  password: string;
  confirmPassword: string;
}

/**
 * ==> Component
 */
const ResetPassword: FC = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm<IFormInput>();

  const navigate = useNavigate();

  // Watch the password and confirmPassword fields
  const password = watch("password");
  const confirmPassword = watch("confirmPassword");

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    if (data.password !== data.confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    console.log(data);
    toast.success("Password has been reset successfully.");
    reset();
    navigate("/login");
  };

  return (
    <>
      <section>
        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-4">
          <div className="bg-[#CBE4E8] aspect-[12/9] hidden md:block">
            <img
              src={login}
              alt="Reset Password"
              className="object-cover w-full h-full"
            />
          </div>
          <div className="container w-full lg:w-[75%] xl:w-[65%]">
            <div className="space-y-8">
              <div className="space-y-1">
                <h2 className="text-2xl font-medium">Reset Password</h2>
                <p className="text-base text-gray-600">
                  Enter your new password and confirm it below.
                </p>
              </div>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="grid grid-cols-12 gap-4">
                  {/* Password Field */}
                  <div className="col-span-12">
                    <input
                      type="password"
                      placeholder="Enter new password"
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
                      placeholder="Confirm new password"
                      className={`w-full h-[50px] border-b-2 px-4 text-primary placeholder-gray-500 focus:outline-none ${
                        confirmPassword && password !== confirmPassword
                          ? "border-red-500"
                          : errors.confirmPassword
                          ? "border-red-500"
                          : "border-gray-300 focus:border-accent"
                      }`}
                      {...register("confirmPassword", {
                        required: "Please confirm your password",
                      })}
                    />
                    {password !== confirmPassword && (
                      <p className="text-red-500 text-sm mt-1">
                        Passwords do not match
                      </p>
                    )}
                    {errors.confirmPassword && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.confirmPassword.message}
                      </p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <div className="col-span-12 flex items-center justify-between mt-4">
                    <button
                      type="submit"
                      className="btn btn-primary w-full"
                    >
                      Reset Password
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

export default memo(ResetPassword);
