import { useContext } from "react";
import { UserContext } from "../App";
import ChangePasswordDialog from "../components/ChangePasswordDialog";
import { calculateLeaveBalance } from "../api/utils";

export default function Profile() {
   const User = useContext(UserContext);

   return (
      <div>
         <div>
            Name: {User?.firstName} {User?.lastName}
         </div>
         <div>Email: {User?.email}</div>
         <div>Start Date: {User?.startDate}</div>
         <div>Salary: {User?.salary}</div>
         <div>Leave Taken: {User?.leaveTaken} hours</div>
         <div>Leave Balance: {(calculateLeaveBalance(User?.startDate) - User?.leaveTaken).toFixed(1)} hours</div>
         <div>Role: {User.role?.role}</div>
         <ChangePasswordDialog />
      </div>
   );
}
