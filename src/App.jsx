import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { ReactQueryDevtools } from "react-query/devtools";
import { createContext, useEffect, useState } from "react";
import { EmployeeService } from "./api/EmployeeService";

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

export const UserContext = createContext();

function App() {
   const navigate = useNavigate();
   const location = useLocation();
   const [user, setUser] = useState({});

   useEffect(() => {
      async function getUser() {
         if (sessionStorage.getItem("id") !== null) {
            try {
               const response = await EmployeeService.getEmployee(sessionStorage.getItem("id"));
               setUser(response);
            } catch {
               setUser(null);
               navigate("/login");
            }
         }
      }

      getUser();
   }, [location]);

   return (
      <div className="container">
         <UserContext.Provider value={user}>
            <Routes>
               <Route path="/" element={<DefaultLayout setUser={setUser} />}>
                  <Route index element={<Dashboard />}></Route>
                  <Route path="profile" element={<Profile />}></Route>
                  <Route path="streams" element={<Streams />}></Route>
                  <Route path="streams/:streamId/classes" element={<AllClasses />}></Route>
                  <Route path="streams/:streamId/class/:classId" element={<ClassDetails />}></Route>
                  <Route path="employees" element={<AllEmployees />}></Route>
                  <Route path="leave" element={<Leave user={user} />}></Route>
                  <Route path="leave-requests" element={<AllLeaveRequests />}></Route>
               </Route>

               <Route path="/login">
                  <Route index element={<Login />}></Route>
               </Route>
               <Route path="/error">
                  <Route index element={<h1>Something went wrong</h1>}></Route>
               </Route>
               <Route path="*" element={<h1>invalid url</h1>} />
            </Routes>
         </UserContext.Provider>

         <ReactQueryDevtools initialIsOpen={false} />
      </div>
   );
}

export default App;
