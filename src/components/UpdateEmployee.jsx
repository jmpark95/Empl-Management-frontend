import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { UserService } from "../api/UserService";

export default function UpdateUser() {
   const { id } = useParams();
   const navigate = useNavigate();
   const [User, setUser] = useState({
      firstName: "",
      lastName: "",
      email: "",
   });

   useEffect(() => {
      const getUser = async () => {
         try {
            const UserDetails = await UserService.getUser(id);
            setUser(UserDetails);
         } catch {
            navigate("/error");
         }
      };

      getUser();
   }, []);

   const handleChange = (e) => {
      const { name, value } = e.target;
      setUser({
         ...User,
         [name]: value,
      });
   };

   const handleSubmit = async (e) => {
      e.preventDefault();
      await UserService.updateUser(User);
      navigate("/");
   };

   return (
      <div>
         <h2>Edit User Details</h2>
         <form onSubmit={handleSubmit}>
            <label>
               First Name:
               <input type="text" name="firstName" value={User.firstName} onChange={handleChange} />
            </label>
            <label>
               Last Name:
               <input type="text" name="lastName" value={User.lastName} onChange={handleChange} />
            </label>
            <label>
               Email:
               <input type="email" name="email" value={User.email} onChange={handleChange} />
            </label>
            <button type="submit">Update User</button>
         </form>
      </div>
   );
}
