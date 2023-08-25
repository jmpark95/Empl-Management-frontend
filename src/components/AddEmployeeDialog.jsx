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
               <TextField
                  InputLabelProps={{ shrink: true }}
                  variant="outlined"
                  label="First Name"
                  type="text"
                  name="firstName"
                  value={formik.values.firstName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
               />
               {formik.errors.firstName ? <p>{formik.errors.firstName}</p> : null}

               <TextField
                  InputLabelProps={{ shrink: true }}
                  variant="outlined"
                  label="Surname"
                  type="text"
                  name="lastName"
                  value={formik.values.lastName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
               />
               {formik.errors.lastName ? <p>{formik.errors.lastName}</p> : null}

               <FormControl fullWidth>
                  <InputLabel id="role-label">Role</InputLabel>
                  <Select
                     labelId="role-label"
                     id="role"
                     name="role"
                     value={formik.values.role}
                     label="Age"
                     onChange={formik.handleChange}
                     onBlur={formik.handleBlur}
                  >
                     {roles.map((role) => (
                        <MenuItem key={role.id} value={role.role}>
                           {role.role}
                        </MenuItem>
                     ))}
                  </Select>
               </FormControl>
               {formik.errors.role ? <p>{formik.errors.role}</p> : null}

               <TextField
                  InputLabelProps={{ shrink: true }}
                  variant="outlined"
                  label="Email"
                  type="email"
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
               />
               {formik.errors.email ? <p>{formik.errors.email}</p> : null}

               <TextField
                  InputLabelProps={{ shrink: true }}
                  variant="outlined"
                  label="Start date"
                  type="date"
                  name="startDate"
                  value={formik.values.startDate}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
               />
               {formik.errors.startDate ? <p>{formik.errors.startDate}</p> : null}

               <TextField
                  InputLabelProps={{ shrink: true }}
                  variant="outlined"
                  label="Salary"
                  type="number"
                  name="salary"
                  value={formik.values.salary}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
               />
               {formik.errors.salary ? <p>{formik.errors.salary}</p> : null}
            </DialogContent>
            <DialogActions>
               <Button onClick={handleClose}>Cancel</Button>
               <Button onClick={formik.handleSubmit}>Confirm</Button>
            </DialogActions>
         </Dialog>
      </>
   );
}
