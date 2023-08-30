import { useQuery } from "react-query";
import { Navigate, Outlet } from "react-router-dom";
import { EmployeeService } from "../api/EmployeeService";

export default function ProtectedRoute({ user }) {
   const employeeQuery = useQuery("employee", () => {
      return EmployeeService.getEmployee(user);
   });
   if (employeeQuery.isLoading) return "Loading...";
   if (employeeQuery.error) return "An error has occurred: ";

   if (user === null) {
      return <Navigate to="/login" replace />;
   }

   if (employeeQuery.data?.hasPersonallySetPassword === false) {
      return <Navigate to="/password" replace />;
   }

   return <Outlet />;
}
