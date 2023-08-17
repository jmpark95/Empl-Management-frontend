import EmployeeTable from "./components/EmployeeTable";
import AddUser from "./pages/AddUser";
import { Routes, Route } from "react-router-dom";
import UpdateEmployee from "./components/UpdateEmployee";
import Login from "./pages/Login";

function App() {
   return (
      <div className="container">
         <Routes>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/add-user" element={<AddUser />}></Route>

            <Route path="/" element={<EmployeeTable />}></Route>
            <Route path="/update-employee/:id" element={<UpdateEmployee />}></Route>
            <Route path="/error" element={<h1>Something went wrong</h1>} />
            <Route path="*" element={<h1>Invalid URL</h1>} />
         </Routes>
      </div>
   );
}

export default App;
