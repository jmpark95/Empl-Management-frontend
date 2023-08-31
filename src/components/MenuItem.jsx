import { Link, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { Link as RouterLink, useLocation } from "react-router-dom";
import GridViewIcon from "@mui/icons-material/GridView";
import BadgeOutlinedIcon from "@mui/icons-material/BadgeOutlined";
import Groups3OutlinedIcon from "@mui/icons-material/Groups3Outlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";

export default function MenuItem({ text, link }) {
   const location = useLocation();

   return (
      <Link to={`${link}`} component={RouterLink} underline="none" color="inherit">
         <ListItem disablePadding>
            <ListItemButton selected={location.pathname === `${link}` ? true : false}>
               <ListItemIcon>
                  {text === "Dashboard" ? <GridViewIcon /> : null}
                  {text === "Employees" ? <BadgeOutlinedIcon /> : null}
                  {text === "Streams" ? <Groups3OutlinedIcon /> : null}
                  {text === "Leave Requests" ? <CalendarMonthOutlinedIcon /> : null}
               </ListItemIcon>
               <ListItemText primary={text} />
            </ListItemButton>
         </ListItem>
      </Link>
   );
}
