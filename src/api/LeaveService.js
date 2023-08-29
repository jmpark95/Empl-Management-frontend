import instance from "./AxiosConfig";

export const LeaveService = {
   getAllLeaveRequests: async () => {
      const response = await instance.get(`/api/leave/leave-requests`);
      return response.data;
   },

   createLeaveRequest: async (formData) => {
      const response = await instance.post(`/api/leave/leave-request`, formData);
      return response.data;
   },

   getAllLeaveRequestsByEmployeeId: async (employeeId) => {
      const response = await instance.get(`/api/leave/leave-requests/${employeeId}`);
      return response.data;
   },
};
