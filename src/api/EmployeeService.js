import axios from "axios";

const BACKEND_BASE_URL = `${import.meta.env.VITE_BACKEND_URL}/api/employee`;

export const EmployeeService = {
   getAllEmployees: async () => {
      try {
         const response = await axios.get(`${BACKEND_BASE_URL}/employees`);
         return response.data;
      } catch (error) {
         console.error("Error fetching employees:", error);
         throw error;
      }
   },

   getAllTrainers: async () => {
      try {
         const response = await axios.get(`${BACKEND_BASE_URL}/trainers`);
         return response.data;
      } catch (error) {
         console.error("Error getting trainers:", error);
         throw error;
      }
   },

   getAllTrainees: async () => {
      try {
         const response = await axios.get(`${BACKEND_BASE_URL}/trainees`);
         return response.data;
      } catch (error) {
         console.error("Error getting trainees:", error);
         throw error;
      }
   },

   getAllTraineesByStreamId: async (id) => {
      try {
         const response = await axios.get(`${BACKEND_BASE_URL}/trainees-by-stream`, {
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

   // getUser: async (id) => {
   //    try {
   //       const response = await axios.get(`${BACKEND_BASE_URL}/${id}`);
   //       return response.data;
   //    } catch (error) {
   //       console.error("Error fetching user:", error);
   //       throw error;
   //    }
   // },

   // addUser: async (formData) => {
   //    try {
   //       const response = await axios.post(`${BACKEND_BASE_URL}/create`, formData);
   //       return response.data;
   //    } catch (error) {
   //       console.error("Error adding user:", error);
   //       throw error;
   //    }
   // },

   // updateUser: async (formData) => {
   //    try {
   //       const response = await axios.put(`${BACKEND_BASE_URL}/update`, formData);
   //       return response.data;
   //    } catch (error) {
   //       console.error("Error updating user:", error);
   //       throw error;
   //    }
   // },

   // deleteUser: async (id) => {
   //    try {
   //       await axios.delete(`${BACKEND_BASE_URL}/delete/${id}`);
   //    } catch (error) {
   //       console.error("Error deleting user:", error);
   //       throw error;
   //    }
   // },

   // getAllRoles: async () => {
   //    try {
   //       const response = await axios.get(`${BACKEND_BASE_URL}/roles`);
   //       return response.data;
   //    } catch (error) {
   //       console.error("Error getting roles:", error);
   //       throw error;
   //    }
   // },
};
