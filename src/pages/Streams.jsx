import { Box, CircularProgress, Link, List, ListItem, ListItemIcon, Typography } from "@mui/material";
import { useQuery } from "react-query";
import { StreamService } from "../api/StreamService";
import { Link as RouterLink } from "react-router-dom";
import TerminalOutlinedIcon from "@mui/icons-material/TerminalOutlined";
import BusinessOutlinedIcon from "@mui/icons-material/BusinessOutlined";
import DocumentScannerOutlinedIcon from "@mui/icons-material/DocumentScannerOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import CloudOutlinedIcon from "@mui/icons-material/CloudOutlined";
import MemoryOutlinedIcon from "@mui/icons-material/MemoryOutlined";

export default function Streams() {
   const streamsQuery = useQuery("allStreams", () => {
      return StreamService.getAllStreams();
   });
   if (streamsQuery.isLoading)
      return (
         <div style={{ display: "flex", justifyContent: "center" }}>
            <CircularProgress />
         </div>
      );
   if (streamsQuery.error) return "An error has occurred: ";

   return (
      <>
         <Box display={"flex"} justifyContent={"start"} gap={"5rem"} sx={{ mt: "2.5rem", mb: "2.5rem" }}>
            <Typography variant="h3" fontWeight={500}>
               All Streams
            </Typography>
         </Box>

         <nav aria-label="main">
            <List>
               {streamsQuery.data.map((stream) => (
                  <ListItem key={stream.name} disablePadding sx={{ mb: "2.5rem" }}>
                     <ListItemIcon>
                        {stream.name === "Software Development" ? <TerminalOutlinedIcon /> : null}
                        {stream.name === "Business Intelligence" ? <BusinessOutlinedIcon /> : null}
                        {stream.name === "Data Engineering" ? <DocumentScannerOutlinedIcon /> : null}
                        {stream.name === "Cybersecurity" ? <SecurityOutlinedIcon /> : null}
                        {stream.name === "Cloud Computing" ? <CloudOutlinedIcon /> : null}
                        {stream.name === "Technical Analysis" ? <MemoryOutlinedIcon /> : null}
                     </ListItemIcon>
                     <Link
                        component={RouterLink}
                        to={`/streams/${stream.id}/classes`}
                        underline="none"
                        color={"inherit"}
                     >
                        <Typography sx={{ ":hover": { textDecoration: "underline" } }} variant="h5">
                           {stream.name}
                        </Typography>
                     </Link>
                  </ListItem>
               ))}
            </List>
         </nav>
      </>
   );
}
