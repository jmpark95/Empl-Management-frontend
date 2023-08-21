//import AddUser from "./pages/AddUser";
import { Routes, Route } from "react-router-dom";
//import UpdateEmployee from "./components/UpdateEmployee";
import Login from "./pages/Login";
import Streams from "./pages/Streams";
import DefaultLayout from "./components/DefaultLayout";
import Dashboard from "./pages/Dashboard";
import { ReactQueryDevtools } from "react-query/devtools";
import AllClasses from "./pages/AllClasses";

function App() {
   return (
      <div className="container">
         <Routes>
            <Route path="/login">
               <Route index element={<Login />}></Route>
            </Route>
            <Route path="/" element={<DefaultLayout />}>
               <Route index element={<Dashboard />}></Route>
               <Route path="add-user" element={<h1>AddUser component will behere later</h1>}></Route>
               <Route path="streams" element={<Streams />}></Route>
               <Route path="streams/classes/:id" element={<AllClasses />}></Route>

               <Route path="update-employee/:id" element={<h1>UpdateEmployee component will behere later</h1>}></Route>
               <Route path="error" element={<h1>Something went wrong</h1>} />
               <Route path="*" element={<h1>invalid url</h1>} />
            </Route>
         </Routes>
         <ReactQueryDevtools initialIsOpen={false} />
      </div>
   );
}

export default App;
