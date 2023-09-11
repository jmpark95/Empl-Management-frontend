import { Routes, Route } from "react-router-dom";
import { ReactQueryDevtools } from "react-query/devtools";

import Login from "./pages/Login";
import Streams from "./pages/Streams";
import Dashboard from "./pages/Dashboard";
import AllClasses from "./pages/AllClasses";
import ClassDetails from "./pages/ClassDetails";
import AllEmployees from "./pages/AllEmployees";
import Profile from "./pages/Profile";
import DefaultLayout from "./components/DefaultLayout";
import Leave from "./pages/Leave";
import AllLeaveRequests from "./pages/AllLeaveRequests";
import SetPassword from "./pages/SetPassword";

function App() {
   return (
      <div className="container">
         <Routes>
            <Route path="/" element={<DefaultLayout />}>
               <Route index element={<Dashboard />}></Route>
               <Route path="profile" element={<Profile />}></Route>
               <Route path="streams" element={<Streams />}></Route>
               <Route path="streams/:streamId/classes" element={<AllClasses />}></Route>
               <Route path="streams/:streamId/class/:classId" element={<ClassDetails />}></Route>
               <Route path="employees" element={<AllEmployees />}></Route>
               <Route path="leave" element={<Leave />}></Route>
               <Route path="leave-requests" element={<AllLeaveRequests />}></Route>
            </Route>

            <Route path="/login" element={<Login />}></Route>
            <Route path="/password" element={<SetPassword />}></Route>
         </Routes>
         <ReactQueryDevtools initialIsOpen={false} />
      </div>
   );
}
export default App;
