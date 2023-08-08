import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { EmployeeService } from "../api/EmployeeService";

export default function UpdateEmployee() {
   const { id } = useParams();
   const navigate = useNavigate();
   const [employee, setEmployee] = useState({
      firstName: "",
      lastName: "",
      email: "",
   });

   useEffect(() => {
      const getEmployee = async () => {
         try {
            const employeeDetails = await EmployeeService.getEmployee(id);
            setEmployee(employeeDetails);
         } catch {
            navigate("/error");
         }
      };

      getEmployee();
   }, []);

   const handleChange = (e) => {
      const { name, value } = e.target;
      setEmployee({
         ...employee,
         [name]: value,
      });
   };

   const handleSubmit = async (e) => {
      e.preventDefault();
      await EmployeeService.updateEmployee(employee);
      navigate("/");
   };

   return (
      <div>
         <h2>Edit Employee Details</h2>
         <form onSubmit={handleSubmit}>
            <label>
               First Name:
               <input type="text" name="firstName" value={employee.firstName} onChange={handleChange} />
            </label>
            <label>
               Last Name:
               <input type="text" name="lastName" value={employee.lastName} onChange={handleChange} />
            </label>
            <label>
               Email:
               <input type="email" name="email" value={employee.email} onChange={handleChange} />
            </label>
            <button type="submit">Update Employee</button>
         </form>
      </div>
   );
}
