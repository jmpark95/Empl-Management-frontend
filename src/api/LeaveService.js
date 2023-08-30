import instance from "./AxiosConfig";

export const LeaveService = {
   getAllLeaveRequests: async () => {
      const response = await instance.get(`/api/leave/leave-requests`);
      return response.data;
   },

   getAllPendingLeaveRequests: async () => {
      const response = await instance.get(`/api/leave/leave-requests/pending`);
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

   approveLeaveRequest: async (leaveId, employeeId, totalHours) => {
      await instance.put(`/api/leave/leave-request/approve`, null, {
         params: {
            leaveId,
            employeeId,
            totalHours,
         },
      });
   },

   declineLeaveRequest: async (leaveId) => {
      await instance.put(`/api/leave/leave-request/decline`, null, {
         params: {
            leaveId,
         },
      });
   },
};
