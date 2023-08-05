import { Button, Container, TextField } from "@mui/material";
import { useState } from "react";
import { EmployeeService } from "../services/EmployeeService";
import { useNavigate } from "react-router-dom";

export default function AddEmployee() {
   const navigate = useNavigate();
   const [formData, setFormData] = useState({
      firstName: "",
      lastName: "",
      emailId: "",
   });

   const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prevData) => ({
         ...prevData,
         [name]: value,
      }));
   };

   const handleSubmit = async (e) => {
      e.preventDefault();
      EmployeeService.addEmployee(formData);
      navigate("/");
   };

   return (
      <Container maxWidth="sm">
         <form onSubmit={handleSubmit}>
            <TextField
               fullWidth
               label="First Name"
               name="firstName"
               value={formData.firstName}
               onChange={handleChange}
               required
            />
            <TextField
               fullWidth
               label="Last Name"
               name="lastName"
               value={formData.lastName}
               onChange={handleChange}
               required
            />
            <TextField
               fullWidth
               label="Email"
               name="emailId"
               type="email"
               value={formData.emailId}
               onChange={handleChange}
               required
            />
            <Button type="submit" variant="contained" color="primary">
               Submit
            </Button>
         </form>
      </Container>
   );
}
