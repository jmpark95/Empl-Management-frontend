import { Box, List, ListItem, ListItemButton, ListItemText, Typography } from "@mui/material";
import { useQuery } from "react-query";
import { StreamService } from "../api/StreamService";
import { Link } from "react-router-dom";

export default function Streams() {
   const streamsQuery = useQuery("allStreams", () => {
      return StreamService.getAllStreams();
   });

   if (streamsQuery.isLoading) return "Loading...";

   if (streamsQuery.error) return "An error has occurred: ";

   return (
      <Box sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
         <Typography variant="h2">All Streams</Typography>
         <nav aria-label="main">
            <List>
               {streamsQuery.data.map((stream) => (
                  <ListItem key={stream.name} disablePadding>
                     <Link to={`/streams/classes/${stream.id}`}>
                        <ListItemButton>
                           <ListItemText primary={stream.name} />
                        </ListItemButton>
                     </Link>
                  </ListItem>
               ))}
            </List>
         </nav>
      </Box>
   );
}
