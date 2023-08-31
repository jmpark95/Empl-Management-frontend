import { useFormik } from "formik";
import * as Yup from "yup";
import { EmployeeService } from "../api/EmployeeService";
import { useNavigate } from "react-router-dom";
import { Box, Button, Container, TextField, Typography } from "@mui/material";

export default function SetPassword() {
   const navigate = useNavigate();
   const formik = useFormik({
      initialValues: {
         employeeId: sessionStorage.getItem("id"),
         password: "",
      },
      validationSchema: Yup.object({
         password: Yup.string().min(5, "Password must be a minimum of 5 characters").required("Password is required"),
      }),
      validateOnChange: false,
      validateOnBlur: false,
      onSubmit: async (values) => {
         try {
            await EmployeeService.setPassword(values);
            navigate("/");
         } catch {
            alert("error");
         }
      },
   });

   return (
      <>
         <Container component="main" maxWidth="xs">
            <Box
               sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  minHeight: "100vh",
               }}
            >
               <Typography component="h1" variant="h4" fontWeight={500} textAlign={"center"}>
                  Please set password to access portal
               </Typography>

               <Box component="form" sx={{ width: "100%" }}>
                  <TextField
                     error={formik.errors.password}
                     helperText={formik.errors.password ? formik.errors.password : " "}
                     margin="normal"
                     fullWidth
                     id="password"
                     label="Password"
                     type="password"
                     autoComplete="current-password"
                     value={formik.values.password}
                     onChange={formik.handleChange}
                  />

                  <Button
                     onClick={formik.handleSubmit}
                     type="submit"
                     fullWidth
                     variant="contained"
                     sx={{ mt: 3, mb: 2 }}
                  >
                     Log In
                  </Button>
               </Box>
            </Box>
         </Container>
      </>
   );
}
