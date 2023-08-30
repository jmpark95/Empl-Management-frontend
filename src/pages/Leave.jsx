import { useQuery } from "react-query";
import SubmitLeaveDialog from "../components/SubmitLeaveDialog";
import { LeaveService } from "../api/LeaveService";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { dateComparator, formatDate } from "../api/utils";
import { useState } from "react";
import { useOutletContext } from "react-router-dom";

export default function Leave() {
   const [user] = useOutletContext();
   const [defaultColDef] = useState({ sortable: true, unSortIcon: true });
   const leaveQuery = useQuery("allLeaveRequests", () => {
      return LeaveService.getAllLeaveRequestsByEmployeeId(sessionStorage.getItem("id"));
   });
   if (leaveQuery.isLoading) return "Loading...";
   if (leaveQuery.error) return "An error has occurred: ";

   const columnDefs = [
      {
         headerName: "From",
         field: "startDate",
         sort: "desc",
         valueGetter: (params) => {
            const leave = params.data;
            return formatDate(leave.startDate);
         },
         comparator: dateComparator,
      },
      {
         headerName: "To",
         field: "endDate",
         valueGetter: (params) => {
            const leave = params.data;
            return formatDate(leave.endDate);
         },
      },
      {
         headerName: "Total hours",
         field: "totalHours",
      },
      {
         field: "status",
      },
   ];

   return (
      <>
         <SubmitLeaveDialog user={user} />
         <h3>Your leave history</h3>
         <div className="ag-theme-alpine" style={{ height: 400, width: "100%" }}>
            <AgGridReact
               defaultColDef={defaultColDef}
               columnDefs={columnDefs}
               rowData={leaveQuery.data}
               suppressMenuHide={true}
            ></AgGridReact>
         </div>
      </>
   );
}
