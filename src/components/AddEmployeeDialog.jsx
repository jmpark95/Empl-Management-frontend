import {
   Button,
   TextField,
   Dialog,
   DialogActions,
   DialogContent,
   InputLabel,
   FormControl,
   Select,
   MenuItem,
   Container,
   Box,
   FormHelperText,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { EmployeeService } from "../api/EmployeeService";
import * as Yup from "yup";

export default function AddEmployeeDialog() {
   const navigate = useNavigate();
   const [open, setOpen] = useState(false);
   const [roles, setRoles] = useState([]);

   const formik = useFormik({
      initialValues: {
         firstName: "",
         lastName: "",
         email: "",
         role: "",
         startDate: "",
         salary: "",
      },
      validationSchema: Yup.object({
         firstName: Yup.string().required("First name is required"),
         lastName: Yup.string().required("Surname is required"),
         email: Yup.string()
            .email("Invalid email")
            .min(9, "Email must be a minimum of 9 characters")
            .required("Email is required"),
         role: Yup.string().required("Role is required"),
         startDate: Yup.string().required("Start date is required"),
         salary: Yup.string().required("Salary is required"),
      }),
      validateOnChange: false,
      validateOnBlur: false,
      onSubmit: async (values, { resetForm }) => {
         await EmployeeService.createEmployee(values);
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

   useEffect(() => {
      async function getAllRoles() {
         const response = await EmployeeService.getAllRoles();
         setRoles(response);
      }

      getAllRoles();
   }, []);

   return (
      <>
         <Button variant="outlined" onClick={handleClickOpen}>
            Add employee
         </Button>
         <Dialog open={open} onClose={handleClose}>
            <DialogContent>
               <Container sx={{ textAlign: "center" }} component="main" maxWidth="xs">
                  <Box sx={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                     <TextField
                        InputLabelProps={{ shrink: true }}
                        error={formik.errors.firstName}
                        helperText={formik.errors.firstName ? formik.errors.firstName : " "}
                        variant="outlined"
                        label="First Name"
                        type="text"
                        name="firstName"
                        value={formik.values.firstName}
                        onChange={formik.handleChange}
                     />

                     <TextField
                        InputLabelProps={{ shrink: true }}
                        error={formik.errors.lastName}
                        helperText={formik.errors.lastName ? formik.errors.lastName : " "}
                        variant="outlined"
                        label="Surname"
                        type="text"
                        name="lastName"
                        value={formik.values.lastName}
                        onChange={formik.handleChange}
                     />

                     <FormControl fullWidth error={formik.errors.role}>
                        <InputLabel id="role-label">Role</InputLabel>
                        <Select
                           labelId="role-label"
                           id="role"
                           name="role"
                           value={formik.values.role}
                           label="Age"
                           onChange={formik.handleChange}
                        >
                           {roles.map((role) => (
                              <MenuItem key={role.id} value={role.role}>
                                 {role.role}
                              </MenuItem>
                           ))}
                        </Select>
                        {formik.errors.role ? (
                           <FormHelperText>{formik.errors.role}</FormHelperText>
                        ) : (
                           <FormHelperText> </FormHelperText>
                        )}
                     </FormControl>

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
               <Button onClick={formik.handleSubmit}>Submit</Button>
            </DialogActions>
         </Dialog>
      </>
   );
}
