import { Link, useParams } from "react-router-dom";
import { ClassService } from "../api/ClassService";
import { useQuery } from "react-query";
import AddClass from "../components/AddClass";
import { StreamService } from "../api/StreamService";

export default function AllClasses() {
   const { id } = useParams();
   const streamQuery = useQuery(["stream", id], () => {
      return StreamService.getStreamById(id);
   });
   const classesQuery = useQuery(["allClasses", id], () => {
      return ClassService.getAllClasses(id);
   });

   if (classesQuery.isLoading || streamQuery.isLoading) return "Loading...";

   if (classesQuery.error || streamQuery.error) return "An error has occurred: ";

   return (
      <>
         <AddClass />

         <h1>{streamQuery.data.name}</h1>
         {classesQuery.data.map((item) => (
            <div key={item.id}>
               <div>{item.startDate}</div>
               <div>{item.endDate}</div>
               <div>Number of trainers: {item.trainers.length}</div>
               <div>Number of trainees:{item.trainees.length}</div>
               <Link>View details</Link>
            </div>
         ))}
      </>
   );
}
