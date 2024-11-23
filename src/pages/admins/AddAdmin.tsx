import { FC, memo, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Spin } from "antd";
import SecTitle from "../../components/global/SecTitle";
import { request } from "../../api/request";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

interface IFormInput {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  password_confirmation: string;
  account_type: string;
}

const AddAdmin: FC = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm<IFormInput>({
    mode: 'onChange', 
  });

  const password = watch("password", "");

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // Submit handler
  const onSubmit: SubmitHandler<IFormInput> = async (data) => {


    const formData = new FormData();

      formData.append("first_name", data.first_name);
      formData.append("last_name", data.last_name);
      formData.append("email", data.email);
      formData.append("password", data.password);
      formData.append("password_confirmation", data.password_confirmation);
      formData.append("account_type", "admin");


    setLoading(true);
    try {
      const res = await request.post("user/register", formData);
      toast.success(res.data.message);
      reset();
      navigate("/admins");
    } catch (err: any) {
      toast.error(err.response?.data?.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section>
      <div className="container">
        <SecTitle title="Add New admin" />
        <Spin spinning={loading}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="wrapper grid md:grid-cols-2 gap-4"
          >
            <div className="package">
              <label htmlFor="first_name" className="label">
                First Name
              </label>
              <input
                id="first_name"
                type="text"
                className="input"
                placeholder="Enter first name"
                {...register("first_name", { required: "First name is required" })}
              />
              {errors.first_name && <p className="error">{errors.first_name.message}</p>}
            </div>
            <div className="package">
              <label htmlFor="last_name" className="label">
                Last Name
              </label>
              <input
                id="last_name"
                type="text"
                className="input"
                placeholder="Enter last name"
                {...register("last_name", { required: "Last name is required" })}
              />
              {errors.last_name && <p className="error">{errors.last_name.message}</p>}
            </div>
            <div className="package md:col-span-2">
              <label htmlFor="email" className="label">
                Email
              </label>
              <input
                id="email"
                type="email"
                className="input"
                placeholder="Enter email"
                {...register("email", { required: "Email is required" })}
              />
              {errors.email && <p className="error">{errors.email.message}</p>}
            </div>
            <div className="package">
              <label htmlFor="password" className="label">
                Password
              </label>
              <input
                id="password"
                type="password"
                className="input"
                placeholder="Enter password"
                {...register("password", { required: "Password is required" })}
              />
              {errors.password && <p className="error">{errors.password.message}</p>}
            </div>
            <div className="package">
              <label htmlFor="password_confirmation" className="label">
                Confirm Password
              </label>
              <input
                id="password_confirmation"
                type="password"
                className="input"
                placeholder="Confirm password"
                {...register("password_confirmation", {
                  required: "Password confirmation is required",
                  validate: (value) =>
                    value === password || "Passwords do not match",
                })}
              />
              {errors.password_confirmation && (
                <p className="error">{errors.password_confirmation.message}</p>
              )}
            </div>
            <div className="md:col-span-2">
              <button type="submit" className="btn btn-primary " disabled={loading}>
                {loading ? <Spin/> : "Submit"}
              </button>
            </div>
          </form>
        </Spin>
      </div>
    </section>
  );
};

export default memo(AddAdmin);
