import { useFormik } from "formik";
import * as Yup from "yup";
import { AuthService } from "../api/AuthService";
import { useNavigate } from "react-router-dom";
import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { useState } from "react";
import IconButton from "@mui/material/IconButton";
import GitHubIcon from "@mui/icons-material/GitHub";

export default function Login() {
   const navigate = useNavigate();
   const [error, setError] = useState("");

   const formik = useFormik({
      initialValues: {
         email: "",
         password: "",
      },
      validationSchema: Yup.object({
         email: Yup.string()
            .email("Invalid email")
            .min(9, "Email must be a minimum of 9 characters")
            .required("Please enter email"),
         password: Yup.string().min(5, "Password must be a minimum of 5 characters").required("Please enter password"),
      }),
      validateOnChange: false,
      validateOnBlur: false,
      onSubmit: async (values, { resetForm }) => {
         try {
            const response = await AuthService.login(values);
            sessionStorage.setItem("id", response.authentication.principal.id);
            resetForm();
            navigate("/");
         } catch {
            setError("Invalid credentials");
         }
      },
   });

   return (
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
            <IconButton
               aria-label="GitHub"
               component="a"
               href="https://github.com/jmpark95/Spring-Employee-Management-System"
               target="_blank"
               rel="noopener noreferrer"
               sx={{
                  alignSelf: "center",
               }}
            >
               <GitHubIcon sx={{ fontSize: 36 }} />
            </IconButton>
            <Typography component="h1" variant="h4" fontWeight={600}>
               Sign In
            </Typography>

            <Box component="form" sx={{ width: "100%" }}>
               <Box>
                  <TextField
                     margin="normal"
                     id="email"
                     fullWidth
                     label="Email Address"
                     name="email"
                     autoComplete="email"
                     value={formik.values.email}
                     onChange={formik.handleChange}
                  />
                  {formik.errors.email ? <Typography variant="body2">{formik.errors.email}</Typography> : null}
               </Box>

               <TextField
                  margin="normal"
                  fullWidth
                  id="password"
                  label="Password"
                  type="password"
                  autoComplete="current-password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
               />
               {formik.errors.password ? <Typography variant="body2">{formik.errors.password}</Typography> : null}

               <Button onClick={formik.handleSubmit} type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                  Log In
               </Button>
               {
                  <Typography textAlign="center" variant="body2" color={"red"}>
                     {error}
                  </Typography>
               }
            </Box>
         </Box>
      </Container>
   );
}
