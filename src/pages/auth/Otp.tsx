import { FC, memo } from "react";
import login from "../../assets/login.png";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import OTP from "antd/es/input/OTP";

/**
 * ==> Form data interface
 */


/**
 * ==> Component
 */
const ForgetPassword: FC = () => {


  const navigate = useNavigate()

  const onSubmit = () => {
    toast.success("Password reset link sent to your email.");
    navigate("/reset-password")
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
                <h2 className="text-2xl font-medium">code reset</h2>
                <p className="text-base text-gray-600">
                  Enter the code you have received
                </p>
              </div>
              <form onSubmit={onSubmit}>
                <div className="grid grid-cols-12 gap-4">
                  {/* Email Field */}
                  <div className="col-span-12 grid place-items-center">
                    <OTP length={4} className="outline-none focus:border-accent w-full" />
                  </div>

                  {/* Submit Button */}
                  <div className="col-span-12 flex items-center justify-between mt-4">
                    <button
                      type="submit"
                      className="btn btn-primary w-full"
                    >
                      check code
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
