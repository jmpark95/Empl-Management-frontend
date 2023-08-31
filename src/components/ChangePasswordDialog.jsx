import { Button, TextField, Dialog, DialogActions, DialogContent, Container, Box, Typography } from "@mui/material";
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
         oldPassword: Yup.string().required("Please enter old password"),
         newPassword: Yup.string()
            .min(5, "Password must be a minimum of 5 characters")
            .required("Please enter new password"),
         confirmPassword: Yup.string()
            .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
            .required("Please confirm new password"),
      }),
      validateOnChange: false,
      validateOnBlur: false,
      onSubmit: async (values, { resetForm }) => {
         try {
            await EmployeeService.updatePassword(values);
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
      setError("");
      formik.resetForm();
   };

   return (
      <>
         <Button variant="outlined" onClick={handleClickOpen}>
            Change Password
         </Button>

         <Dialog open={open} onClose={handleClose}>
            <DialogContent>
               <Container sx={{ textAlign: "center" }} component="main" maxWidth="xs">
                  <Box sx={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                     <TextField
                        InputLabelProps={{ shrink: true }}
                        error={formik.errors.oldPassword}
                        helperText={formik.errors.oldPassword ? formik.errors.oldPassword : " "}
                        label="Old Password"
                        variant="outlined"
                        type="password"
                        name="oldPassword"
                        value={formik.values.oldPassword}
                        onChange={formik.handleChange}
                     />

                     <TextField
                        InputLabelProps={{ shrink: true }}
                        error={formik.errors.newPassword}
                        helperText={formik.errors.newPassword ? formik.errors.newPassword : " "}
                        label="New Password"
                        variant="outlined"
                        type="password"
                        name="newPassword"
                        value={formik.values.newPassword}
                        onChange={formik.handleChange}
                     />

                     <TextField
                        InputLabelProps={{ shrink: true }}
                        error={formik.errors.confirmPassword}
                        helperText={formik.errors.confirmPassword ? formik.errors.confirmPassword : " "}
                        label="Confirm Password"
                        variant="outlined"
                        type="password"
                        name="confirmPassword"
                        value={formik.values.confirmPassword}
                        onChange={formik.handleChange}
                     />
                  </Box>
                  {error ? (
                     <Typography color={"red"} variant="body2">
                        {error}
                     </Typography>
                  ) : null}
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
