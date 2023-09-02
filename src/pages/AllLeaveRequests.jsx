import { useQuery, useQueryClient } from "react-query";
import { LeaveService } from "../api/LeaveService";
import { useState } from "react";
import { dateComparator, formatDate } from "../api/utils";
import { AgGridReact } from "ag-grid-react";
import { Box, Button, Typography } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

export default function AllLeaveRequests() {
   const queryClient = useQueryClient();
   const [defaultColDef] = useState({ sortable: true, unSortIcon: true });

   const leaveQuery = useQuery("allPendingLeaveRequests", () => {
      return LeaveService.getAllPendingLeaveRequests();
   });
   if (leaveQuery.isLoading)
      return (
         <div style={{ display: "flex", justifyContent: "center" }}>
            <CircularProgress />
         </div>
      );
   if (leaveQuery.error) return "An error has occurred: ";

   const columnDefs = [
      {
         headerName: "Requested By",
         field: "requester",
         valueGetter: (params) => {
            const { requester } = params.data;
            return `${requester.firstName} ${requester.lastName}`;
         },
      },
      {
         headerName: "From",
         field: "startDate",
         sort: "asc",
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
      {
         field: "actions",
         sortable: false,
         width: 500,
         cellRenderer: (params) => (
            <>
               <Button variant="text" onClick={() => handleApprove(params)}>
                  Approve
               </Button>
               <Button variant="text" onClick={() => handleDecline(params)}>
                  Decline
               </Button>
            </>
         ),
      },
   ];

   const handleApprove = async (params) => {
      if (confirm("Are you sure you want to approve this request?")) {
         await LeaveService.approveLeaveRequest(params.data.id, params.data.requester.id, params.data.totalHours);
         queryClient.refetchQueries("allPendingLeaveRequests");
         ///seems like there is a bug where refetching query isn't returning most up to date server state despite await? Will use setTimetout until I can find a fix
         //I'm thinking it may be to do with ag-grid and how i'm trying to integrate react query with ag-grid when I shouldn't?
         //Maybe database operation is not completed before fetching all pending requests?
         setTimeout(() => {
            queryClient.refetchQueries("allPendingLeaveRequests");
         }, 500);
      }
   };

   const handleDecline = async (params) => {
      if (confirm("Are you sure you want to decline this request?")) {
         await LeaveService.declineLeaveRequest(params.data.id);
         queryClient.refetchQueries("allPendingLeaveRequests");

         setTimeout(() => {
            queryClient.refetchQueries("allPendingLeaveRequests");
         }, 500);
      }
   };

   return (
      <>
         <Box display={"flex"} justifyContent={"start"} gap={"5rem"} sx={{ mt: "2.5rem", mb: "2.5rem" }}>
            <Typography variant="h3" fontWeight={500}>
               Pending Leave Requests
            </Typography>
         </Box>
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
