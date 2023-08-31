import { Box, Drawer, AppBar, CssBaseline, Toolbar, Typography, Divider, Button, Link } from "@mui/material";
import { Link as RouterLink, Outlet, useNavigate } from "react-router-dom";
import MenuItem from "./MenuItem";
import { useEffect, useState } from "react";
import { EmployeeService } from "../api/EmployeeService";

const drawerWidth = 240;

export default function DefaultLayout() {
   const navigate = useNavigate();
   const [user, setUser] = useState({});
   const [loading, setLoading] = useState(true);

   useEffect(() => {
      async function getUser() {
         if (sessionStorage.getItem("id") === null) {
            navigate("/login");
         }

         if (sessionStorage.getItem("id") !== null) {
            try {
               const response = await EmployeeService.getEmployee(sessionStorage.getItem("id"));
               if (response.hasPersonallySetPassword === false) {
                  navigate("/password");
               }
               setUser(response);
            } catch {
               setUser(null);
               navigate("/login");
            }
         }
         setLoading(false);
      }

      getUser();
   }, []);

   const logout = () => {
      sessionStorage.clear();
      setUser(null);
      navigate("/login");
   };

   if (loading) {
      return "Loading";
   }

   return (
      <Box sx={{ display: "flex" }}>
         <CssBaseline />
         <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
            <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
               <Box>
                  <Typography variant="h6" noWrap component="div">
                     <Link to="/profile" component={RouterLink} underline="none" color="inherit">
                        Hi {user.firstName} {user.lastName}
                     </Link>
                  </Typography>
               </Box>

               <Box>
                  <Button color="inherit" onClick={logout}>
                     Logout
                  </Button>
               </Box>
            </Toolbar>
         </AppBar>

         <Drawer
            variant="permanent"
            sx={{
               width: drawerWidth,
               flexShrink: 0,
               [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: "border-box" },
            }}
         >
            <Toolbar />
            <Box sx={{ overflow: "auto" }}>
               {user && user.role?.role === "HR" ? (
                  <>
                     <MenuItem text="Dashboard" link="/" />
                     <MenuItem text="Employees" link="/employees" />
                     <MenuItem text="Streams" link="/streams" />
                     <MenuItem text="Leave Requests" link="/leave-requests" />
                  </>
               ) : (
                  <MenuItem text="Leave" link="/leave" />
               )}

               <Divider sx={{ paddingTop: "30px" }} />
            </Box>
         </Drawer>

         <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
            <Toolbar />
            <Link onClick={() => navigate(-1)} component={RouterLink} color="inherit">
               &lt;Back
            </Link>

            <Outlet context={[user, setUser]} />
         </Box>
      </Box>
   );
}
