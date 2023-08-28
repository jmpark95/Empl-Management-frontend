import axios from "axios";

// export const instance = axios.create({
//    baseURL: `${import.meta.env.VITE_BACKEND_URL}`,
//    //Have to remove this because dynamic changes to access_token doesn't seem to update axios instance? Research this later
//    //Edit 1 - Also, it seems like Authorization bearer needs to be added to every request? If I exit the browser tab(which clears sessionStorage)
//    //and then revisit localhost5173 and log back in, it doesn't pick up access_token properly
//    //Edit 2 - using axios interceptor fixed the problem
//    // headers: {
//    //    Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
//    // },
// });

const instance = axios.create({
   baseURL: `${import.meta.env.VITE_BACKEND_URL}`,
});

instance.interceptors.request.use(
   (config) => {
      const accessToken = sessionStorage.getItem("access_token");

      if (accessToken) {
         config.headers.Authorization = `Bearer ${accessToken}`;
      }

      return config;
   },
   (error) => {
      return Promise.reject(error);
   }
);

export default instance;
