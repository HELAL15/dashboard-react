import { FC, memo } from "react";
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";

/**
 * ==> props interface
 */
interface IProps {
  swiper:any
}

/**
 * ==> Component
 */
const SwiperNav: FC<IProps> = ({ swiper }) => {

  // if (!swiper) return null;


  return (
    <div className="flex items-center gap-2">
      <button className="w-[40px] h-[40px] hover:bg-accent hover:text-primary-white duration-300 rounded-full bg-light grid place-items-center" onClick={() => swiper.slideNext()}>
        <i className="rtl:-scale-100">
          <FaArrowLeftLong />
        </i>
      </button>
      <button className="w-[40px] h-[40px] hover:bg-accent hover:text-primary-white duration-300 rounded-full bg-light grid place-items-center" onClick={() => swiper.slidePrev()}>
        <i className="rtl:-scale-100">
          <FaArrowRightLong />
        </i>
      </button>
    </div>
  );
}

export default memo(SwiperNav);