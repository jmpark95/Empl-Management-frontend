import { Link, useNavigate, useParams } from "react-router-dom";
import { ClassService } from "../api/ClassService";
import { useQuery } from "react-query";
import { StreamService } from "../api/StreamService";
import { Box } from "@mui/material";
import AddClassDialog from "../components/AddClassDialog";

export default function AllClasses() {
   const navigate = useNavigate();
   const { streamId } = useParams();
   const streamQuery = useQuery(["stream", streamId], () => {
      return StreamService.getStreamById(streamId);
   });
   const classesQuery = useQuery(["allClasses", streamId], () => {
      return ClassService.getAllClasses(streamId);
   });

   if (classesQuery.isLoading || streamQuery.isLoading) return "Loading...";

   if (classesQuery.error || streamQuery.error) return "An error has occurred: ";

   return (
      <>
         <button onClick={() => navigate(-1)}>Go back </button>
         <AddClassDialog />

         <h1>{streamQuery.data.name}</h1>
         {classesQuery.data.map((item) => (
            <Box key={item.id} sx={{ marginBottom: "40px" }}>
               <div>
                  <div>{item.startDate}</div>
                  <div>{item.endDate}</div>
                  <div>Number of trainers: {item.trainers.length}</div>
                  <div>Number of trainees:{item.trainees.length}</div>
                  <Link to={`/streams/${streamId}/class/${item.id}`}>View details</Link>
               </div>
            </Box>
         ))}
      </>
   );
}
