import { FC, memo } from "react";
import { Outlet } from "react-router";
import BreadCrumb from "../../components/global/BreadCrumb";
import { NavLink } from "react-router-dom";

/**
 * ==> props interface
 */
interface IProps {

}

/**
 * ==> Component
 */
const ProfileOutlet: FC<IProps> = ({  }) => {
  return (
    <>
      <BreadCrumb/>
      <section className="pt-0">
        <div className="container">
          <div className="grid gap-4 grid-cols-12">
            <div className="col-span-12 md:col-span-3 space-y-4  ">
              <div>
                <h3 className="text-base font-medium">manage my account</h3>
                <div className="flex flex-col gap-1 mt-3 ml-8">
                  <NavLink end className="profile-link" to={'/profile'}>my profile</NavLink>
                  <NavLink end className="profile-link" to={'/profile/address'}>address book</NavLink>
                  <NavLink end className="profile-link" to={'/profile/payment-option'}>my payment option</NavLink>
                </div>
              </div>
              <div>
                <h3 className="text-base font-medium">my orders</h3>
                <div className="flex flex-col gap-1 mt-3 ml-8">
                  <NavLink end className="profile-link" to={'/profile/returns'}>my returns</NavLink>
                  <NavLink end className="profile-link" to={'/profile/cancellation'}>my cancellation</NavLink>
                </div>
              </div>
            </div>
            <div className="col-span-12 md:col-span-9 shadow-shadow ">
              <Outlet/>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default memo(ProfileOutlet);