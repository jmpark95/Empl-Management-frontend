import instance from "./AxiosConfig";

export const EmployeeService = {
   getAllEmployees: async () => {
      try {
         const response = await instance.get(`/api/employee/employees`);
         return response.data;
      } catch (error) {
         console.error("Error fetching employees:", error);
         throw error;
      }
   },

   getAllTrainers: async () => {
      try {
         const response = await instance.get(`/api/employee/trainers`);
         return response.data;
      } catch (error) {
         console.error("Error getting trainers:", error);
         throw error;
      }
   },

   getAllTrainees: async () => {
      try {
         const response = await instance.get(`/api/employee/trainees`);
         return response.data;
      } catch (error) {
         console.error("Error getting trainees:", error);
         throw error;
      }
   },

   getAllUnregisteredTraineesByStreamId: async (id) => {
      try {
         const response = await instance.get(`/api/employee/trainees-by-stream`, {
            params: {
               streamId: id,
            },
         });
         return response.data;
      } catch (error) {
         console.error("Error getting trainees:", error);
         throw error;
      }
   },

   getAllTraineesByStreamId: async (id) => {
      try {
         const response = await instance.get(`/api/employee/all-trainees-by-stream`, {
            params: {
               streamId: id,
            },
         });
         return response.data;
      } catch (error) {
         console.error("Error getting trainees:", error);
         throw error;
      }
   },

   getAllRoles: async () => {
      try {
         const response = await instance.get(`/api/employee/roles`);
         return response.data;
      } catch (error) {
         console.error("Error getting roles:", error);
         throw error;
      }
   },

   updateEmployee: async (formikData) => {
      const response = await instance.put(`/api/employee/update`, formikData);
      return response.data;
   },

   deleteEmployee: async (employeeId, role) => {
      const response = await instance.delete(`/api/employee/${employeeId}/${role}`);
      return response.data;
   },

   createEmployee: async (formikData) => {
      try {
         const response = await instance.post(`/api/employee/employee`, formikData);
         return response.data;
      } catch (error) {
         console.error("Error adding employee:", error);
         throw error;
      }
   },

   getEmployee: async (employeeId) => {
      try {
         const response = await instance.get(`/api/employee/${employeeId}`);
         return response.data;
      } catch (error) {
         sessionStorage.clear();
         console.error("Error getting employee:", error);
         throw error;
      }
   },

   updatePassword: async (formikData) => {
      try {
         const response = await instance.patch(`/api/employee/password`, formikData);
         return response.data;
      } catch (error) {
         console.error("Error updating password:", error);
         throw error;
      }
   },

   setPassword: async (formikData) => {
      try {
         const response = await instance.patch(`/api/employee/set-password`, formikData);
         return response.data;
      } catch (error) {
         console.error("Error setting password:", error);
         throw error;
      }
   },
};
