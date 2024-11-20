import { FC, memo, useState } from "react";
import { FaPlus } from "react-icons/fa6";

/**
 * ==> props interface
 */
interface IProps {
  onFileChange: (file: File | null, e: React.ChangeEvent<HTMLInputElement>) => void; 
  label?:string;
  name?:string;
}

/**
 * ==> Component
 */
const Upload: FC<IProps> = ({ onFileChange , label , name }) => {
  const [img, setImg] = useState<string | undefined>(undefined);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImg(reader.result as string);
      };
      reader.readAsDataURL(file);
      onFileChange(file , e);

    }
  };

  return (
    <>
      <div className="flex flex-col">
        <label className="mb-2" htmlFor="upload">
          {label}
        </label>
        <div className="w-32 h-32 rounded relative overflow-hidden border border-dashed border-primary ">
            <input
              id="upload"
              type="file"
              onChange={handleChange}
              name={name}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            {img? <img src={img} alt="Uploaded Preview" className="absoulte inset-0 w-full h-full object-contain" /> : 
            <div className="w-full h-full text-center content-center text-base font-semibold space-y-2 cursor-pointer">
              <i className=""><FaPlus className="mx-auto" /></i>
              <p>upload</p>
            </div>
            }
          </div>
        </div>
    </>
  );
};

export default memo(Upload);
