import { useState, useEffect } from "react";
import { UserService } from "../api/UserService";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

export default function UserTable() {
   const navigate = useNavigate();
   const [Users, setUsers] = useState([]);

   useEffect(() => {
      const getAllUsers = async () => {
         try {
            const allUsers = await UserService.getAllUsers();

            setUsers(allUsers);
         } catch {
            navigate("/error");
         }
      };

      getAllUsers();
   }, []);

   const handleDelete = async (id) => {
      try {
         if (confirm("Are you sure you want to delete?")) {
            await UserService.deleteUser(id);
            const updatedUsers = await UserService.getAllUsers();
            setUsers(updatedUsers);
         }
      } catch {
         navigate("/error");
      }
   };

   return (
      <div>
         <h2>Users List</h2>
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
               {Users.map((User) => (
                  <tr key={User.id}>
                     <td>{User.firstName}</td>
                     <td>{User.lastName}</td>
                     <td>{User.email}</td>
                     <td>
                        <Link to={`/update-User/${User.id}`}>Update</Link>
                     </td>
                     <td>
                        <Button variant="outlined" onClick={() => handleDelete(User.id)}>
                           Delete
                        </Button>
                     </td>
                  </tr>
               ))}
            </tbody>
         </table>
      </div>
   );
}
