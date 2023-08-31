import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { useEffect, useState } from "react";
import { calculateLeaveBalance, calculateTotalWorkingHoursBetweenStartDateAndEndDate, isWeekday } from "../api/utils";
import DatePicker from "react-datepicker";
import { setHours, setMinutes } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";
import { LeaveService } from "../api/LeaveService";
import { useQueryClient } from "react-query";

export default function SubmitLeaveDialog({ user }) {
   const queryClient = useQueryClient();
   const [open, setOpen] = useState(false);
   const [startDate, setStartDate] = useState();
   const [endDate, setEndDate] = useState();
   const [totalHours, setTotalHours] = useState();

   const handleClickOpen = () => {
      setOpen(true);
   };

   const handleClose = () => {
      setStartDate(null);
      setEndDate(null);
      setOpen(false);
   };

   const isSubmitDisabled = () => {
      if (
         startDate == null ||
         endDate == null ||
         totalHours > calculateLeaveBalance(user?.startDate) - user?.leaveTaken ||
         totalHours < 0 ||
         startDate > endDate
      ) {
         return true;
      }
      return false;
   };

   const handleSubmit = async () => {
      try {
         await LeaveService.createLeaveRequest({
            employeeID: sessionStorage.getItem("id"),
            startDate,
            endDate,
            totalHours,
         });
         queryClient.refetchQueries("allLeaveRequests");
         setStartDate(null);
         setEndDate(null);
         setOpen(false);
      } catch {
         alert("errror");
      }
   };

   useEffect(() => {
      const totalHours = calculateTotalWorkingHoursBetweenStartDateAndEndDate(startDate, endDate);

      setTotalHours(totalHours.toFixed(1));
   }, [startDate, endDate]);

   return (
      <>
         <Button variant="outlined" onClick={handleClickOpen}>
            Request Leave
         </Button>
         <Dialog open={open} onClose={handleClose}>
            <DialogTitle>
               Current Leave Balance: {calculateLeaveBalance(user?.startDate) - user?.leaveTaken} hours
            </DialogTitle>
            <DialogContent>
               <Box sx={{ mb: "2.5rem" }}>
                  <div>From</div>
                  <DatePicker
                     showTimeSelect
                     minTime={new Date(0, 0, 0, 9, 0)}
                     maxTime={new Date(0, 0, 0, 17, 30)}
                     selected={startDate}
                     dateFormat="dd/MM/yyyy h:mm aa"
                     inline
                     filterDate={isWeekday}
                     excludeTimes={[setHours(setMinutes(new Date(), 0), 13)]}
                     onChange={(date) => setStartDate(date)}
                  />
               </Box>

               <div>To</div>
               <DatePicker
                  showTimeSelect
                  minTime={new Date(0, 0, 0, 9, 0)}
                  maxTime={new Date(0, 0, 0, 17, 30)}
                  selected={endDate}
                  dateFormat="dd/MM/yyyy h:mm aa"
                  inline
                  excludeTimes={[setHours(setMinutes(new Date(), 0), 13)]}
                  filterDate={isWeekday}
                  onChange={(date) => setEndDate(date)}
               />

               <div>Total hours: {totalHours && totalHours > 0 && startDate < endDate ? totalHours : null}</div>
               <div>
                  {totalHours > calculateLeaveBalance(user?.startDate) - user?.leaveTaken
                     ? "Exceeded leave balance"
                     : ""}
               </div>
            </DialogContent>
            <DialogActions>
               <Button onClick={handleClose}>Cancel</Button>
               <Button disabled={isSubmitDisabled()} onClick={handleSubmit}>
                  Submit
               </Button>
            </DialogActions>
         </Dialog>
      </>
   );
}
