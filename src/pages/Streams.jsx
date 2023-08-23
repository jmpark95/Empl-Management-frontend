import { Box, List, ListItem, ListItemButton, ListItemText, Typography } from "@mui/material";
import { useQuery } from "react-query";
import { StreamService } from "../api/StreamService";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";

export default function Streams() {
   const [open, setOpen] = useState(false);

   const handleClickOpen = () => {
      setOpen(true);
   };

   const handleClose = () => {
      setOpen(false);
   };

   const streamsQuery = useQuery("allStreams", () => {
      return StreamService.getAllStreams();
   });

   if (streamsQuery.isLoading) return "Loading...";

   if (streamsQuery.error) return "An error has occurred: ";

   return (
      <Box sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
         <Typography variant="h2">All Streams</Typography>
         <Button variant="outlined" onClick={handleClickOpen}>
            Add a stream
         </Button>
         <Dialog open={open} onClose={handleClose}>
            <DialogTitle>New Stream </DialogTitle>
            <DialogContent>
               <TextField autoFocus margin="dense" id="name" label="Name" type="text" fullWidth variant="standard" />
            </DialogContent>
            <DialogActions>
               <Button onClick={handleClose}>Cancel</Button>
               <Button onClick={handleClose}>Add</Button>
            </DialogActions>
         </Dialog>
         <nav aria-label="main">
            <List>
               {streamsQuery.data.map((stream) => (
                  <ListItem key={stream.name} disablePadding>
                     <Link to={`/streams/${stream.id}/classes`}>
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
