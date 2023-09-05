import { Box, Link, Paper, Typography } from "@mui/material";
import { StreamService } from "../api/StreamService";
import { Link as RouterLink, useOutletContext } from "react-router-dom";
import { useQuery } from "react-query";
import { EmployeeService } from "../api/EmployeeService";
import { LeaveService } from "../api/LeaveService";
import CircularProgress from "@mui/material/CircularProgress";

export default function Dashboard() {
   const [user] = useOutletContext();

   const streamsQuery = useQuery("allStreams", () => {
      return StreamService.getAllStreams();
   });
   const employeesQuery = useQuery("allEmployees", () => {
      return EmployeeService.getAllEmployees();
   });
   const leaveRequestsQuery = useQuery("allLeaveRequests", () => {
      return LeaveService.getAllPendingLeaveRequests();
   });
   const leaveQuery = useQuery("allLeaveRequestsCurrentUser", () => {
      return LeaveService.getAllLeaveRequestsByEmployeeId(sessionStorage.getItem("id"));
   });
   if (streamsQuery.isLoading || employeesQuery.isLoading || leaveRequestsQuery.isLoading || leaveQuery.isLoading)
      return (
         <div style={{ display: "flex", justifyContent: "center" }}>
            <CircularProgress />
         </div>
      );

   if (streamsQuery.error || employeesQuery.error || leaveRequestsQuery.isLoading || leaveQuery.error)
      return "An error has occurred: ";

   if (user && user.role?.role === "HR") {
      return (
         <>
            <Box
               sx={{
                  display: "flex",
                  justifyContent: "center",
                  flexWrap: "wrap",
                  "& > :not(style)": {
                     m: 1,
                     width: 170,
                     height: 140,
                  },
               }}
            >
               <Paper elevation={3}>
                  <Box padding={"20px"}>
                     <Link to={"/employees"} component={RouterLink} underline="none" color="inherit">
                        <Typography variant="h3">{employeesQuery.data.length}</Typography>
                        {employeesQuery.data.length === 1 ? "Employee" : "Employees"}
                     </Link>
                  </Box>
               </Paper>
               <Paper elevation={3}>
                  <Box padding={"20px"}>
                     <Link to={"/streams"} component={RouterLink} underline="none" color="inherit">
                        <Typography variant="h3">{streamsQuery.data.length} </Typography>
                        {streamsQuery.data.length === 1 ? "Stream" : "Streams"}
                     </Link>
                  </Box>
               </Paper>

               <Paper elevation={3}>
                  <Box padding={"20px"}>
                     <Link to={"/leave-requests"} component={RouterLink} underline="none" color="inherit">
                        <Typography variant="h3">{leaveRequestsQuery.data.length} </Typography>
                        {leaveRequestsQuery.data.length === 1 ? "Pending Leave Request" : "Pending Leave Requests"}
                     </Link>
                  </Box>
               </Paper>
            </Box>
            <Box>
               <iframe
                  src="https://web.powerva.microsoft.com/environments/Default-58a45382-bc25-41e8-9c22-59141988be9a/bots/cr7bf_employeeManagementSystem/webchat?__version__=2"
                  frameBorder="0"
                  style={{ width: "30%", height: "60%", position: "fixed", bottom: 0, right: 0 }}
               ></iframe>
            </Box>
         </>
      );
   }

   return (
      <>
         <Box
            sx={{
               display: "flex",
               justifyContent: "center",
               flexWrap: "wrap",
               "& > :not(style)": {
                  m: 1,
                  width: 170,
                  height: 140,
               },
            }}
         >
            <Paper elevation={3}>
               <Box padding={"20px"}>
                  <Link to={"/leave"} component={RouterLink} underline="none" color="inherit">
                     <Typography variant="h3">{leaveQuery.data.length} </Typography>
                     {leaveQuery.data.length === 1 ? "Leave Request" : "Leave Requests"}
                  </Link>
               </Box>
            </Paper>
         </Box>
         <Box>
            <iframe
               src="https://web.powerva.microsoft.com/environments/Default-58a45382-bc25-41e8-9c22-59141988be9a/bots/cr7bf_employeeManagementSystem/webchat?__version__=2"
               frameBorder="0"
               style={{ width: "30%", height: "60%", position: "fixed", bottom: 0, right: 0 }}
            ></iframe>
         </Box>
      </>
   );
}
