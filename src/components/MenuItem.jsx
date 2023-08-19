import { ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import InboxIcon from "@mui/icons-material/MoveToInbox";

export default function MenuItem({ text, link }) {
   const location = useLocation();

   return (
      <Link to={`${link}`}>
         <ListItem disablePadding>
            <ListItemButton selected={location.pathname === `${link}` ? true : false}>
               <ListItemIcon>
                  <InboxIcon />
               </ListItemIcon>
               <ListItemText primary={text} />
            </ListItemButton>
         </ListItem>
      </Link>
   );
}
