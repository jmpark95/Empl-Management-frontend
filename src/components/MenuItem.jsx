import { Link, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { Link as RouterLink, useLocation } from "react-router-dom";
import GridViewIcon from "@mui/icons-material/GridView";
import BadgeOutlinedIcon from "@mui/icons-material/BadgeOutlined";
import Groups3OutlinedIcon from "@mui/icons-material/Groups3Outlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import ListOutlinedIcon from "@mui/icons-material/ListOutlined";

export default function MenuItem({ text, link }) {
   const location = useLocation();
   const isSelected = location.pathname === link || location.pathname.startsWith(`${link}/`);

   return (
      <Link to={`${link}`} component={RouterLink} underline="none" color="inherit">
         <ListItem disablePadding>
            <ListItemButton selected={isSelected}>
               <ListItemIcon>
                  {text === "Dashboard" ? <GridViewIcon /> : null}
                  {text === "Employees" ? <BadgeOutlinedIcon /> : null}
                  {text === "Streams" ? <Groups3OutlinedIcon /> : null}
                  {text === "Leave" ? <CalendarMonthOutlinedIcon /> : null}
                  {text === "Leave Requests" ? <ListOutlinedIcon /> : null}
               </ListItemIcon>
               <ListItemText
                  primary={text}
                  primaryTypographyProps={{
                     style: {
                        fontWeight: isSelected ? "bold" : "normal",
                     },
                  }}
               />
            </ListItemButton>
         </ListItem>
      </Link>
   );
}
