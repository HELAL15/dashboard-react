
import { FC, memo, useState } from "react";
import { FaFileExcel } from "react-icons/fa6";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { request } from "../../api/request";
import { toast } from "react-toastify";
import CustomButton from "./CustomButton";
import { Tooltip } from "antd";

/**
 * ==> props interface
 */
interface IProps {
  endPoint?:string
}

/**
 * ==> Component
 */
const ExportExcel: FC<IProps> = ({ endPoint='faqs' }) => {

  const [exportLoading , setExportLoading] = useState(false)
  const exportToExcel = async () => {
    setExportLoading(true)
    try {
       
       const res = await request.get(`/${endPoint}?export=yes`)
      
      setExportLoading(false)
       
      
      const dataToExport = res?.data?.data?.data;
      if (!dataToExport || dataToExport.length === 0) {
        toast.error("No data available for export.");
        return;
      }
  
      const worksheet = XLSX.utils.json_to_sheet(
        dataToExport.map((item: any) => {
          const { key, action, ...exportableData } = item;
          return exportableData;
        })
      );
  
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Exported Data");
  
      const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
      const dataBlob = new Blob([excelBuffer], { type: "application/octet-stream" });
      const fileName = "data exported.xlsx";
      saveAs(dataBlob, fileName);
  
      toast.success("All data exported successfully!");
    } catch (error) {
      console.error("Export Error:", error);
      toast.error("Failed to export data.");
      setExportLoading(false)
    }
  };


  return (
    <>
      <CustomButton 
        loading={exportLoading} 
        onClick={exportToExcel} 
        >
          <Tooltip className="w-full h-full" placement="bottom" title="excel" >
            <FaFileExcel className="text-xl" />
          </Tooltip>
      </CustomButton>
    </>
  );
}

export default memo(ExportExcel);