import { FC, memo } from "react";

/**
 * ==> props interface
 */
interface IProps {

}

/**
 * ==> Component
 */
const SocialMedia: FC<IProps> = ({  }) => {
  return (
    <>
    <section>
      <div className="container">
      <form action="" className="bg-white rounded px-4 py-8 shadow-shadow">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="package flex flex-col ">
                <label className="label" htmlFor="facebook">Facebook</label>
                <input type="url" id="facebook" className="input" placeholder="Facebook URL" />
              </div>
              <div className="package flex flex-col ">
                <label className="label" htmlFor="twitter">Twitter</label>
                <input type="url" id="twitter" className="input" placeholder="Twitter URL" />
              </div>
              <div className="package flex flex-col ">
                <label className="label" htmlFor="instagram">Instagram</label>
                <input type="url" id="instagram" className="input" placeholder="Instagram URL" />
              </div>
              <div className="package flex flex-col ">
                <label className="label" htmlFor="linkedin">LinkedIn</label>
                <input type="url" id="linkedin" className="input" placeholder="LinkedIn URL" />
              </div>
              <div className="package flex flex-col ">
                <label className="label" htmlFor="youtube">YouTube</label>
                <input type="url" id="youtube" className="input" placeholder="YouTube URL" />
              </div>
            </div>
            <div className="mt-4">
              <button className="btn btn-primary">Save Links</button>
            </div>
          </form>
      </div>
    </section>
    </>
  );
}

export default memo(SocialMedia);