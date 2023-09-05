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
import { Box } from "@mui/material";

function App() {
   return (
      <div className="container">
         <Box>
            <iframe
               src="https://web.powerva.microsoft.com/environments/Default-58a45382-bc25-41e8-9c22-59141988be9a/bots/cr7bf_employeeManagementSystem/webchat?__version__=2"
               frameBorder="0"
               style={{ width: "30%", height: "50%", position: "fixed", bottom: 0, right: 0 }}
            ></iframe>
         </Box>
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
