import EmployeeTable from "./components/EmployeeTable";
import AddEmployee from "./components/AddEmployee";
import { Routes, Route, Link } from "react-router-dom";
import UpdateEmployee from "./components/UpdateEmployee";

function App() {
   return (
      <div className="container">
         <nav>
            <Link to={"/"}>Home</Link>
            <Link to={"/add-employee"}>Add Employee</Link>
         </nav>

         <Routes>
            <Route path="/" element={<EmployeeTable />}></Route>
            <Route path="/add-employee" element={<AddEmployee />}></Route>
            <Route path="/update-employee/:id" element={<UpdateEmployee />}></Route>
            <Route path="/error" element={<h1>Something went wrong</h1>} />
            <Route path="*" element={<h1>Invalid URL</h1>} />
         </Routes>
      </div>
   );
}

export default App;
