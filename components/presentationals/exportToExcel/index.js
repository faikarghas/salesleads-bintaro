import React from 'react'
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";

import {API_URL,API_URL_LOCAL} from '../../../utils/config'
import {optionsPeriodeLaporan} from '../../../utils/data'


export const ExportToExcel = ({ period, token }) => {
  const fileType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  const fileExtension = ".xlsx";

  const exportToCSV = async ( period) => {

    const getData = await fetch(`${API_URL}/stats/reports?period=${period}`,{
      method:"GET",
      headers:{
        'Authorization': 'Bearer ' + token,
      }
    })
    const result = await getData.json()

    if (result.status !== 400) {
      console.log(result.data);
      const wsContactTime = XLSX.utils.json_to_sheet(result.data["Contact Time"]);
      const wsCreatedLeads = XLSX.utils.json_to_sheet(result.data["Created Leads"]);
      const wsProperty = XLSX.utils.json_to_sheet(result.data["Property Distribution"]);
      const wsSourceDistribution = XLSX.utils.json_to_sheet(result.data["Source Distribution"]);
      const wsStatusDistribution = XLSX.utils.json_to_sheet(result.data["Status Distribution"]);


      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, wsContactTime, "Contact Time");
      XLSX.utils.book_append_sheet(wb, wsCreatedLeads, "Created Leads");
      XLSX.utils.book_append_sheet(wb, wsProperty, "Property Distribution");
      XLSX.utils.book_append_sheet(wb, wsSourceDistribution, "Source Distribution");
      XLSX.utils.book_append_sheet(wb, wsStatusDistribution, "Status Distribution");


      let filename = optionsPeriodeLaporan.filter((i)=>{
        return i.value == period
      })[0].label;

      console.log(filename);
      console.log(period,'PERIOD');

      XLSX.writeFile(wb, `Leads Report Periode ${filename}.xlsx`);

    }

  };


  return (
    <div className='send-email' onClick={(e) => exportToCSV(period)}>Download</div>
  );
};