import { FC, memo, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

/**
 * ==> Props interface
 */
interface IProps {}

/**
 * ==> Form values interface
 */
interface IFormInputs {
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

/**
 * ==> Component
 */
const Profile: FC<IProps> = () => {
  const { register, handleSubmit, formState: { errors }, setValue , watch } = useForm<IFormInputs>();

  // Watch the values of newPassword and confirmPassword
  const newPassword = watch("newPassword");

  const user = useSelector((state:RootState)=>state.user.data)
  const {
    name,
    email
  } = user

  useEffect(()=>{
    setValue("firstName", name?.split(' ')[0]);
    setValue("lastName", name?.split(' ')[1]);
    setValue("email", email)
  },[])

  const onSubmit: SubmitHandler<IFormInputs> = data => {
    console.log(data);
    // Add your submit logic here
  };

  const handleCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    // Add your cancel logic here
  };

  return (
    <>
      <section className="">
        <div className="container">
          <div className="wrapper">
            <h3 className="text-accent font-medium text-xl mb-4">Edit Your Profile</h3>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <div className="package">
                  <label className="label" htmlFor="firstName">First Name</label>
                  <input
                    type="text"
                    className="input"
                    placeholder="First Name"
                    {...register("firstName", { required: true })}
                  />
                  {errors.firstName && <span className="text-red-500">This field is required</span>}
                </div>
                <div className="package">
                  <label className="label" htmlFor="lastName">Last Name</label>
                  <input
                    type="text"
                    className="input"
                    placeholder="Last Name"
                    {...register("lastName", { required: true })}
                  />
                  {errors.lastName && <span className="text-red-500">This field is required</span>}
                </div>
                <div className="package">
                  <label className="label" htmlFor="email">Email</label>
                  <input
                    type="email"
                    className="input"
                    placeholder="Email"
                    {...register("email", { 
                      required: "Email is required", 
                      pattern: {
                        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                        message: "Invalid email address"
                      }
                    })}
                  />
                  {errors.email && <span className="text-red-500">{errors.email.message}</span>}
                </div>
                <div className="package">
                  <label className="label" htmlFor="address">Address</label>
                  <input
                    type="text"
                    className="input"
                    placeholder="Address"
                    {...register("address", { required: true })}
                  />
                  {errors.address && <span className="text-red-500">This field is required</span>}
                </div>
              </div>
              <div className="mt-4 md:mt-6">
                <div className="package">
                  <label className="label">Password Changes</label>
                  <div className="space-y-4">
                    <input
                      type="password"
                      className="input"
                      placeholder="Current Password"
                      {...register("currentPassword")}
                    />
                    <input
                      type="password"
                      className="input"
                      placeholder="New Password"
                      {...register("newPassword", { minLength: 6 })}
                    />
                    {errors.newPassword && <span className="text-red-500">Password must be at least 6 characters long</span>}
                    <input
                      type="password"
                      className="input"
                      placeholder="Confirm Password"
                      {...register("confirmPassword", {
                        validate: value => value === newPassword || "Passwords do not match",
                      })}
                    />
                    {errors.confirmPassword && <span className="text-red-500">{errors.confirmPassword.message}</span>}
                  </div>
                </div>
              </div>
              <div className="mt-4 md:mt-6 flex items-center justify-end gap-2">
                <button onClick={handleCancel} className="px-8 py-4 rounded">Cancel</button>
                <button type="submit" className="px-8 py-4 rounded btn-primary">Save Changes</button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}

export default memo(Profile);
