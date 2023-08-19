import { Box, Paper } from "@mui/material";
import { StreamService } from "../api/StreamService";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import { UserService } from "../api/UserService";
import { LeaveService } from "../api/LeaveService";

export default function Dashboard() {
   const streamsQuery = useQuery("streams", () => {
      return StreamService.getAllStreams();
   });
   const usersQuery = useQuery("users", () => {
      return UserService.getAllUsers();
   });
   const leaveRequestsQuery = useQuery("leaveRequests", () => {
      return LeaveService.getAllLeaveRequests();
   });

   if (streamsQuery.isLoading || usersQuery.isLoading || leaveRequestsQuery.isLoading) return "Loading...";

   if (streamsQuery.error || usersQuery.error || leaveRequestsQuery.isLoading) return "An error has occurred: ";

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
            <Link to={"/"}>
               {usersQuery.data.length} {usersQuery.data.length === 1 ? "Employee" : "Employees"}
            </Link>
         </Paper>
         <Paper elevation={3}>
            <Link to={"/"}>
               {leaveRequestsQuery.data.length}{" "}
               {leaveRequestsQuery.data.length === 1 ? "Leave Request" : "Leave Request"}
            </Link>
         </Paper>
      </Box>
   );
}
