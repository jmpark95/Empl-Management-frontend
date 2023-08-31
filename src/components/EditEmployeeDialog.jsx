import {
   Button,
   TextField,
   Dialog,
   DialogActions,
   DialogContent,
   DialogTitle,
   Typography,
   Container,
   Box,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { parseDate } from "../api/utils";
import { EmployeeService } from "../api/EmployeeService";
import * as Yup from "yup";

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
      validationSchema: Yup.object({
         firstName: Yup.string().required("First name is required"),
         lastName: Yup.string().required("Surname is required"),
         email: Yup.string()
            .email("Invalid email")
            .min(9, "Email must be a minimum of 9 characters")
            .required("Email is required"),
         startDate: Yup.string().required("Start date is required"),
         salary: Yup.string().required("Salary is required"),
      }),
      validateOnChange: false,
      validateOnBlur: false,
      onSubmit: async (values, { resetForm }) => {
         try {
            await EmployeeService.updateEmployee(values);
            alert("Success!");
            navigate(0);
            resetForm();
            handleClose();
         } catch {
            alert("error");
         }
      },
   });

   const handleClickOpen = () => {
      setOpen(true);
   };
   const handleClose = () => {
      setOpen(false);
   };

   return (
      <>
         <Button onClick={handleClickOpen}>
            <Typography variant="body2">Edit</Typography>
         </Button>
         <Dialog open={open} onClose={handleClose} fullWidth>
            <DialogTitle>Edit employee details</DialogTitle>

            <DialogContent>
               <Container sx={{ textAlign: "center" }} component="main" maxWidth="xs">
                  <Box sx={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                     <TextField
                        error={formik.errors.firstName}
                        helperText={formik.errors.firstName ? formik.errors.firstName : " "}
                        InputLabelProps={{ shrink: true }}
                        variant="outlined"
                        label="First Name"
                        type="text"
                        name="firstName"
                        value={formik.values.firstName}
                        onChange={formik.handleChange}
                        sx={{ mt: "1rem" }}
                     />

                     <TextField
                        error={formik.errors.lastName}
                        helperText={formik.errors.lastName ? formik.errors.lastName : " "}
                        InputLabelProps={{ shrink: true }}
                        variant="outlined"
                        label="Surname"
                        type="text"
                        name="lastName"
                        value={formik.values.lastName}
                        onChange={formik.handleChange}
                     />

                     <TextField
                        error={formik.errors.email}
                        helperText={formik.errors.email ? formik.errors.email : " "}
                        InputLabelProps={{ shrink: true }}
                        variant="outlined"
                        label="Email"
                        type="email"
                        name="email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                     />

                     <TextField
                        error={formik.errors.startDate}
                        helperText={formik.errors.startDate ? formik.errors.startDate : " "}
                        InputLabelProps={{ shrink: true }}
                        variant="outlined"
                        label="Start date"
                        type="date"
                        name="startDate"
                        value={formik.values.startDate}
                        onChange={formik.handleChange}
                     />

                     <TextField
                        error={formik.errors.salary}
                        helperText={formik.errors.salary ? formik.errors.salary : " "}
                        InputLabelProps={{ shrink: true }}
                        variant="outlined"
                        label="Salary"
                        type="number"
                        name="salary"
                        value={formik.values.salary}
                        onChange={formik.handleChange}
                     />
                  </Box>
               </Container>
            </DialogContent>
            <DialogActions>
               <Button onClick={handleClose}>Cancel</Button>
               <Button onClick={formik.handleSubmit}>Confirm</Button>
            </DialogActions>
         </Dialog>
      </>
   );
}
