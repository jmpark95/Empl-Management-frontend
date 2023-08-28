import { Button, TextField, Dialog, DialogActions, DialogContent } from "@mui/material";
import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { EmployeeService } from "../api/EmployeeService";

export default function ChangePasswordDialog() {
   const [open, setOpen] = useState(false);
   const [error, setError] = useState("");

   const formik = useFormik({
      initialValues: {
         employeeID: sessionStorage.getItem("id"),
         oldPassword: "",
         newPassword: "",
         confirmPassword: "",
      },
      validationSchema: Yup.object({
         oldPassword: Yup.string().required("Password is required"),
         newPassword: Yup.string()
            .min(5, "Password must be a minimum of 5 characters")
            .required("Password is required"),
         confirmPassword: Yup.string()
            .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
            .required("Password is required"),
      }),
      onSubmit: async (values, { resetForm }) => {
         try {
            await EmployeeService.updatePassword(values);
            alert("success!");
            resetForm();
            handleClose();
         } catch (error) {
            setError(error.response.data);
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
         <Button variant="outlined" onClick={handleClickOpen}>
            Change Password
         </Button>
         <Dialog open={open} onClose={handleClose}>
            <DialogContent>
               <TextField
                  InputLabelProps={{ shrink: true }}
                  variant="outlined"
                  label="Old Password"
                  type="password"
                  name="oldPassword"
                  value={formik.values.oldPassword}
                  onChange={formik.handleChange}
               />
               {formik.errors.oldPassword ? <p>{formik.errors.oldPassword}</p> : null}

               <TextField
                  InputLabelProps={{ shrink: true }}
                  variant="outlined"
                  label="New Password"
                  type="password"
                  name="newPassword"
                  value={formik.values.newPassword}
                  onChange={formik.handleChange}
               />
               {formik.errors.newPassword ? <p>{formik.errors.newPassword}</p> : null}

               <TextField
                  InputLabelProps={{ shrink: true }}
                  variant="outlined"
                  label="Confirm Password"
                  type="password"
                  name="confirmPassword"
                  value={formik.values.confirmPassword}
                  onChange={formik.handleChange}
               />
               {formik.errors.confirmPassword ? <p>{formik.errors.confirmPassword}</p> : null}

               {error}
            </DialogContent>
            <DialogActions>
               <Button onClick={handleClose}>Cancel</Button>
               <Button onClick={formik.handleSubmit}>Confirm</Button>
            </DialogActions>
         </Dialog>
      </>
   );
}
