import { Link as RouterLink, useParams } from "react-router-dom";
import { ClassService } from "../api/ClassService";
import { useQuery } from "react-query";
import { StreamService } from "../api/StreamService";
import { Box, Link, Typography } from "@mui/material";
import AddClassDialog from "../components/AddClassDialog";
import { AgGridReact } from "ag-grid-react";
import { useState } from "react";
import { dateComparator, formatDate } from "../api/utils";

export default function AllClasses() {
   const { streamId } = useParams();
   const [defaultColDef] = useState({ sortable: true, unSortIcon: true });

   const streamQuery = useQuery(["stream", streamId], () => {
      return StreamService.getStreamById(streamId);
   });
   const classesQuery = useQuery(["allClasses", streamId], () => {
      return ClassService.getAllClasses(streamId);
   });
   if (classesQuery.isLoading || streamQuery.isLoading) return "Loading...";
   if (classesQuery.error || streamQuery.error) return "An error has occurred: ";

   const columnDefs = [
      {
         headerName: "Start Date",
         field: "startDate",
         valueGetter: (params) => {
            const date = params.data;
            return formatDate(date.startDate);
         },
         comparator: dateComparator,
         sort: "desc",
      },
      {
         headerName: "End Date",
         field: "endDate",
         comparator: dateComparator,
         valueGetter: (params) => {
            const date = params.data;
            return formatDate(date.endDate);
         },
      },
      {
         headerName: "Number of trainers",
         field: "trainers.length",
      },
      {
         headerName: "Number of trainees",
         field: "trainees.length",
      },
      {
         field: "actions",
         sortable: false,
         cellRenderer: (params) => (
            <Link component={RouterLink} color="inherit" to={`/streams/${streamId}/class/${params.data.id}`}>
               View details
            </Link>
         ),
      },
   ];

   return (
      <>
         <Box
            display={"flex"}
            justifyContent={"start"}
            alignItems={"center"}
            gap="5rem"
            sx={{ mt: "2.5rem", mb: "2.5rem" }}
         >
            <Typography variant="h3" fontWeight={500}>
               {streamQuery.data.name}
            </Typography>
            <AddClassDialog />
         </Box>

         <div className="ag-theme-alpine" style={{ height: 400, width: "100%" }}>
            <Typography variant="h6" fontWeight={500}>
               All Classes
            </Typography>
            <AgGridReact
               defaultColDef={defaultColDef}
               columnDefs={columnDefs}
               rowData={classesQuery.data}
               suppressMenuHide={true}
            ></AgGridReact>
         </div>

         {/* {classesQuery.data.map((item) => (
            <Box key={item.id} sx={{ marginBottom: "40px" }}>
               <div>
                  <div>{item.startDate}</div>
                  <div>{item.endDate}</div>
                  <div>Number of trainers: {item.trainers.length}</div>
                  <div>Number of trainees:{item.trainees.length}</div>
                  <Link to={`/streams/${streamId}/class/${item.id}`}>View details</Link>
               </div>
            </Box>
         ))} */}
      </>
   );
}
