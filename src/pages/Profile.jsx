import ChangePasswordDialog from "../components/ChangePasswordDialog";
import { calculateLeaveBalance } from "../api/utils";
import { useOutletContext } from "react-router-dom";

export default function Profile() {
   const [user] = useOutletContext();

   return (
      <div>
         <div>
            Name: {user.firstName} {user.lastName}
         </div>
         <div>Email: {user.email}</div>
         <div>Start Date: {user.startDate}</div>
         <div>Salary: {user.salary}</div>
         <div>Leave Taken: {user.leaveTaken} hours</div>
         <div>Leave Balance: {(calculateLeaveBalance(user.startDate) - user.leaveTaken).toFixed(1)} hours</div>
         <div>Role: {user.role.role}</div>
         <ChangePasswordDialog />
      </div>
   );
}
