import axios from "axios";

const BACKEND_BASE_URL = `${import.meta.env.VITE_BACKEND_URL}/api/leave`;

export const LeaveService = {
   getAllLeaveRequests: async () => {
      const response = await axios.get(`${BACKEND_BASE_URL}/leave-requests`);
      return response.data;
   },
};
