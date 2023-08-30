import { useFormik } from "formik";
import * as Yup from "yup";
import { EmployeeService } from "../api/EmployeeService";

export default function SetPassword() {
   const formik = useFormik({
      initialValues: {
         employeeId: sessionStorage.getItem("id"),
         password: "",
      },
      validationSchema: Yup.object({
         password: Yup.string().min(5, "Password must be a minimum of 5 characters").required("Password is required"),
      }),
      onSubmit: async (values) => {
         try {
            await EmployeeService.setPassword(values);
         } catch {
            alert("error");
         }
      },
   });

   return (
      <>
         <div>You have not set ur password yet. Set ur password here</div>
         <form onSubmit={formik.handleSubmit}>
            <input type="password" name="password" value={formik.values.password} onChange={formik.handleChange} />
            <input type="submit" />
         </form>
      </>
   );
}
