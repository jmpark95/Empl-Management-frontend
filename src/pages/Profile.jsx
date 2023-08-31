import ChangePasswordDialog from "../components/ChangePasswordDialog";
import { calculateLeaveBalance, formatDate } from "../api/utils";
import { useOutletContext } from "react-router-dom";
import { Box, Paper, Typography } from "@mui/material";

export default function Profile() {
   const [user] = useOutletContext();

   return (
      <div>
         <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
            <Paper elevation={3} sx={{ padding: 4, width: 400 }}>
               <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
                  <Typography variant="h5" gutterBottom style={{ textAlign: "left" }}>
                     <strong>Role:</strong> {user.role.role}
                  </Typography>
                  <Typography variant="h5" gutterBottom style={{ textAlign: "left" }}>
                     <strong>Email:</strong> {user.email}
                  </Typography>
                  <Typography variant="h5" gutterBottom style={{ textAlign: "left" }}>
                     <strong>Start Date:</strong> {formatDate(user.startDate)}
                  </Typography>
                  <Typography variant="h5" gutterBottom style={{ textAlign: "left" }}>
                     <strong>Salary:</strong> ${user.salary}
                  </Typography>
                  <Typography variant="h5" gutterBottom style={{ textAlign: "left" }}>
                     <strong>Leave Taken:</strong> {user.leaveTaken.toFixed(1)} hours
                  </Typography>
                  <Typography variant="h5" gutterBottom style={{ textAlign: "left" }}>
                     <strong>Leave Balance:</strong>{" "}
                     {(calculateLeaveBalance(user.startDate) - user.leaveTaken).toFixed(1)} hours
                  </Typography>
               </div>
               <Box sx={{ textAlign: "center", marginTop: "2rem" }}>
                  <ChangePasswordDialog />
               </Box>
            </Paper>
         </Box>
      </div>
   );
}
