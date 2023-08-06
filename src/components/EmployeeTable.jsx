import { useState, useEffect } from "react";
import { EmployeeService } from "../services/EmployeeService";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";

export default function EmployeeTable() {
   const [employees, setEmployees] = useState([]);
   const [open, setOpen] = useState(false);

   const handleClickOpen = () => {
      setOpen(true);
   };

   const handleClose = () => {
      setOpen(false);
   };

   const handleDelete = async (id) => {
      await EmployeeService.deleteEmployee(id);

      const updatedEmployees = await EmployeeService.getAllEmployees();
      setEmployees(updatedEmployees);

      setOpen(false);
   };

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
                     <td>
                        <Button variant="outlined" onClick={handleClickOpen}>
                           Delete
                        </Button>
                        <Dialog
                           open={open}
                           onClose={handleClose}
                           aria-labelledby="alert-dialog-title"
                           aria-describedby="alert-dialog-description"
                        >
                           <DialogContent>
                              <DialogContentText id="alert-dialog-description">Delete this user?</DialogContentText>
                           </DialogContent>
                           <DialogActions>
                              <Button onClick={handleClose}>Cancel</Button>
                              <Button onClick={() => handleDelete(employee.id)} autoFocus>
                                 Delete
                              </Button>
                           </DialogActions>
                        </Dialog>
                     </td>
                  </tr>
               ))}
            </tbody>
         </table>
      </div>
   );
}
