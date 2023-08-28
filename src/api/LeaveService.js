// import axios from "axios";

// const BACKEND_BASE_URL = `${import.meta.env.VITE_BACKEND_URL}/api/leave`;

// export const LeaveService = {
//    getAllLeaveRequests: async () => {
//       const response = await axios.get(`${BACKEND_BASE_URL}/leave-requests`);
//       return response.data;
//    },
// };

import instance from "./AxiosConfig";

export const LeaveService = {
   getAllLeaveRequests: async () => {
      const response = await instance.get(`/api/leave/leave-requests`);
      return response.data;
   },
};
