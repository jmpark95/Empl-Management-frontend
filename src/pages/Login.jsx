import { useFormik } from "formik";
import * as Yup from "yup";
import { AuthService } from "../api/AuthService";
import { useNavigate } from "react-router-dom";

export default function Login() {
   const navigate = useNavigate();
   const formik = useFormik({
      initialValues: {
         email: "",
         password: "",
      },
      validationSchema: Yup.object({
         email: Yup.string()
            .email("Invalid email")
            .min(9, "Email must be a minimum of 9 characters")
            .required("Email is required"),
         password: Yup.string().min(5, "Password must be a minimum of 5 characters").required("Password is required"),
      }),
      onSubmit: async (values, { resetForm }) => {
         try {
            const response = await AuthService.login(values);
            console.log(response);
            sessionStorage.setItem("id", response.authentication.principal.id);
            resetForm();
            navigate("/");
         } catch {
            alert("Login fail");
         }
      },
   });

   return (
      <form onSubmit={formik.handleSubmit}>
         <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
         />
         {formik.touched.email && formik.errors.email ? <p>{formik.errors.email}</p> : null}

         <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
         />
         {formik.touched.password && formik.errors.password ? <p>{formik.errors.password}</p> : null}

         <button type="submit">Submit</button>
      </form>
   );
}
