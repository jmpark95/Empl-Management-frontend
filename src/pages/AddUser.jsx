// import { Container, TextField } from "@mui/material";
// import { useEffect, useState } from "react";
// import { UserService } from "../api/EmployeeService";
// import { useNavigate } from "react-router-dom";
// import { useFormik } from "formik";
// import * as Yup from "yup";

// export default function AddUser() {
//    const navigate = useNavigate();
//    const [rolesOptions, setRolesOptions] = useState([]);
//    const formik = useFormik({
//       initialValues: {
//          firstName: "",
//          lastName: "",
//          email: "",
//          salary: "",
//          role: "",
//       },
//       validationSchema: Yup.object({
//          firstName: Yup.string().required("First name is required"),
//          lastName: Yup.string().required("Last name is required"),
//          email: Yup.string()
//             .email("Invalid email")
//             .min(9, "Email must be a minimum of 9 characters")
//             .required("Email is required"),
//          salary: Yup.string().required("Salary is required"),
//       }),
//       onSubmit: async (values, { resetForm }) => {
//          try {
//             await UserService.addUser(values);
//             alert(
//                "User successfully added. Their password is the same as their email address. User must reset password before accessing system"
//             );
//             resetForm();
//          } catch {
//             navigate("/error");
//          }
//       },
//    });

//    useEffect(() => {
//       const getAllRoles = async () => {
//          const allRoles = await UserService.getAllRoles();
//          const options = allRoles.map((role) => <option key={role.id} value={role.role} label={role.role}></option>);
//          setRolesOptions(options);
//       };

//       getAllRoles();
//    }, []);

//    return (
//       <Container maxWidth="sm">
//          <h1>Add a user</h1>
//          <form onSubmit={formik.handleSubmit}>
//             <TextField
//                fullWidth
//                label="First Name"
//                name="firstName"
//                value={formik.values.firstName}
//                onChange={formik.handleChange}
//                onBlur={formik.handleBlur}
//             />
//             {formik.touched.firstName && formik.errors.firstName ? <p>{formik.errors.firstName}</p> : null}

//             <TextField
//                fullWidth
//                label="Last Name"
//                name="lastName"
//                value={formik.values.lastName}
//                onChange={formik.handleChange}
//                onBlur={formik.handleBlur}
//             />
//             {formik.touched.lastName && formik.errors.lastName ? <p>{formik.errors.lastName}</p> : null}

//             <TextField
//                fullWidth
//                label="Email"
//                name="email"
//                type="email"
//                value={formik.values.email}
//                onChange={formik.handleChange}
//                onBlur={formik.handleBlur}
//             />
//             {formik.touched.email && formik.errors.email ? <p>{formik.errors.email}</p> : null}

//             <input
//                type="number"
//                name="salary"
//                placeholder="salary"
//                value={formik.values.salary}
//                onChange={formik.handleChange}
//                onBlur={formik.handleBlur}
//             ></input>
//             {formik.touched.salary && formik.errors.salary ? <p>{formik.errors.salary}</p> : null}

//             <select id="role" name="role" onChange={formik.handleChange} value={formik.values.role}>
//                <option value="" selected disabled hidden>
//                   Select user&apos;s role
//                </option>
//                {rolesOptions}
//             </select>

//             <button type="submit">Submit</button>
//          </form>
//       </Container>
//    );
// }
