import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { parseDate } from "../api/utils";
import { EmployeeService } from "../api/EmployeeService";

export default function EditEmployeeDialog({ params }) {
   const navigate = useNavigate();
   const [open, setOpen] = useState(false);

   const formik = useFormik({
      initialValues: {
         id: params.data.id,
         firstName: params.data.firstName,
         lastName: params.data.lastName,
         email: params.data.email,
         startDate: parseDate(params.data.startDate),
         salary: params.data.salary,
      },
      onSubmit: async (values, { resetForm }) => {
         await EmployeeService.updateEmployee(values);
         navigate(0);
         resetForm();
         handleClose();
      },
   });

   const handleClickOpen = () => {
      setOpen(true);
   };
   const handleClose = () => {
      formik.resetForm();
      setOpen(false);
   };

   return (
      <>
         <Button variant="outlined" onClick={handleClickOpen}>
            Edit
         </Button>
         <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Edit employee details</DialogTitle>

            <DialogContent>
               <TextField
                  InputLabelProps={{ shrink: true }}
                  variant="outlined"
                  label="First Name"
                  type="text"
                  name="firstName"
                  value={formik.values.firstName}
                  onChange={formik.handleChange}
               />

               <TextField
                  InputLabelProps={{ shrink: true }}
                  variant="outlined"
                  label="Surname"
                  type="text"
                  name="lastName"
                  value={formik.values.lastName}
                  onChange={formik.handleChange}
               />

               <TextField
                  InputLabelProps={{ shrink: true }}
                  variant="outlined"
                  label="Email"
                  type="email"
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
               />

               <TextField
                  InputLabelProps={{ shrink: true }}
                  variant="outlined"
                  label="Start date"
                  type="date"
                  name="startDate"
                  value={formik.values.startDate}
                  onChange={formik.handleChange}
               />

               <TextField
                  InputLabelProps={{ shrink: true }}
                  variant="outlined"
                  label="Salary"
                  type="number"
                  name="salary"
                  value={formik.values.salary}
                  onChange={formik.handleChange}
               />
            </DialogContent>
            <DialogActions>
               <Button onClick={handleClose}>Cancel</Button>
               <Button onClick={formik.handleSubmit}>Confirm</Button>
            </DialogActions>
         </Dialog>
      </>
   );
}
