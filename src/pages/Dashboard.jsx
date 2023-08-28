import { Box, Paper } from "@mui/material";
import { StreamService } from "../api/StreamService";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import { EmployeeService } from "../api/EmployeeService";
import { LeaveService } from "../api/LeaveService";

export default function Dashboard() {
   const streamsQuery = useQuery("allStreams", () => {
      return StreamService.getAllStreams();
   });
   const employeesQuery = useQuery("allEmployees", () => {
      return EmployeeService.getAllEmployees();
   });
   const leaveRequestsQuery = useQuery("allLeaveRequests", () => {
      return LeaveService.getAllLeaveRequests();
   });

   if (streamsQuery.isLoading || employeesQuery.isLoading || leaveRequestsQuery.isLoading) return "Loading...";

   if (streamsQuery.error || employeesQuery.error || leaveRequestsQuery.isLoading) return "An error has occurred: ";

   return (
      <Box
         sx={{
            display: "flex",
            flexWrap: "wrap",
            "& > :not(style)": {
               m: 1,
               width: 128,
               height: 128,
            },
         }}
      >
         <Paper elevation={3}>
            <Link to={"/streams"}>
               {streamsQuery.data.length} {streamsQuery.data.length === 1 ? "Stream" : "Streams"}
            </Link>
         </Paper>
         <Paper elevation={3}>
            <Link to={"/employees"}>
               {employeesQuery.data.length} {employeesQuery.data.length === 1 ? "Employee" : "Employees"}
            </Link>
         </Paper>
         <Paper elevation={3}>
            <Link to={"/leave-requests"}>
               {leaveRequestsQuery.data.length}{" "}
               {leaveRequestsQuery.data.length === 1 ? "Leave Request" : "Leave Requests"}
            </Link>
         </Paper>
      </Box>
   );
}
