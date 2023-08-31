import { EmployeeService } from "../api/EmployeeService";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useCallback, useEffect, useRef, useState } from "react";
import EditEmployeeDialog from "../components/EditEmployeeDialog";
import { dateComparator, formatDate } from "../api/utils";
import { useNavigate } from "react-router-dom";
import AddEmployeeDialog from "../components/AddEmployeeDialog";

export default function AllEmployees() {
   const navigate = useNavigate();
   const gridRef = useRef();
   const [defaultColDef] = useState({ sortable: true, unSortIcon: true });
   const [rowData, setRowData] = useState([]);

   const columnDefs = [
      {
         headerName: "First Name",
         field: "firstName",
         sort: "asc",
      },
      {
         headerName: "Surname",
         field: "lastName",
      },
      { field: "email" },
      { field: "role" },
      {
         headerName: "Start Date",
         field: "startDate",
         comparator: dateComparator,
      },
      { field: "salary" },
      {
         field: "actions",
         sortable: false,
         cellRenderer: (params) => (
            <>
               <EditEmployeeDialog params={params} />

               <Button onClick={() => handleDelete(params)}>
                  <Typography variant="body2">Delete</Typography>
               </Button>
            </>
         ),
      },
   ];

   const handleDelete = async (params) => {
      if (confirm("Are you sure you want to delete this employee?")) {
         try {
            await EmployeeService.deleteEmployee(params.data.id, params.data.role);
            alert("Success!");
            navigate(0);
         } catch {
            alert("error");
            navigate("/error");
         }
      }
   };

   const onFilterTextBoxChanged = useCallback(() => {
      gridRef.current.api.setQuickFilter(document.getElementById("filter-text-box").value);
   }, []);

   useEffect(() => {
      async function getAllEmployees() {
         const response = await EmployeeService.getAllEmployees();
         setRowData(
            response.map((employee) => ({
               id: employee.id,
               firstName: employee.firstName,
               lastName: employee.lastName,
               role: employee.role.role,
               email: employee.email,
               startDate: formatDate(employee.startDate),
               salary: employee.salary,
               actions: "actions",
            }))
         );
      }

      getAllEmployees();
   }, []);

   const onFirstDataRendered = useCallback(() => {
      gridRef.current.api.sizeColumnsToFit();
   }, []);

   return (
      <Box>
         <h1>All employees</h1>
         <Box display={"flex"} justifyContent={"space-around"} sx={{ mb: "2rem" }}>
            <TextField
               type="text"
               id="filter-text-box"
               placeholder="Filter employee by keyword"
               onChange={onFilterTextBoxChanged}
            ></TextField>
            <AddEmployeeDialog />
         </Box>

         <div className="ag-theme-alpine" style={{ height: 500, width: "100%" }}>
            <AgGridReact
               ref={gridRef}
               defaultColDef={defaultColDef}
               columnDefs={columnDefs}
               rowData={rowData}
               suppressMenuHide={true}
               onFirstDataRendered={onFirstDataRendered}
            ></AgGridReact>
         </div>
      </Box>
   );
}
