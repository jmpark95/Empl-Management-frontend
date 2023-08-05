import { useState, useEffect } from "react";
import { EmployeeService } from "../services/EmployeeService";
import { Link } from "react-router-dom";

export default function EmployeeTable() {
   const [employees, setEmployees] = useState([]);

   useEffect(() => {
      const getAllEmployees = async () => {
         const allEmployees = await EmployeeService.getAllEmployees();
         setEmployees(allEmployees);
      };

      getAllEmployees();
   }, []);

   return (
      <div>
         <h2>Employees List</h2>
         <table>
            <thead>
               <tr>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Email</th>
                  <th>Actions</th>
               </tr>
            </thead>
            <tbody>
               {employees.map((employee) => (
                  <tr key={employee.id}>
                     <td>{employee.firstName}</td>
                     <td>{employee.lastName}</td>
                     <td>{employee.emailId}</td>
                     <td>
                        <Link to={`/update-employee/${employee.id}`}>Update</Link>
                     </td>
                  </tr>
               ))}
            </tbody>
         </table>
      </div>
   );
}
