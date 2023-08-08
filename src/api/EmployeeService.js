import axios from "axios";

const BACKEND_BASE_URL = import.meta.env.VITE_BACKEND_URL;

export const EmployeeService = {
   getAllEmployees: async () => {
      try {
         const response = await axios.get(`${BACKEND_BASE_URL}/api/employee/all`);
         return response.data;
      } catch (error) {
         console.error("Error fetching employee:", error);
         throw error;
      }
   },

   getEmployee: async (id) => {
      try {
         const response = await axios.get(`${BACKEND_BASE_URL}/api/employee/find/${id}`);
         return response.data;
      } catch (error) {
         console.error("Error fetching employee:", error);
         throw error;
      }
   },

   addEmployee: async (formData) => {
      try {
         const response = await axios.post(`${BACKEND_BASE_URL}/api/employee/create`, formData);
         return response.data;
      } catch (error) {
         console.error("Error adding employee:", error);
         throw error;
      }
   },

   updateEmployee: async (formData) => {
      try {
         const response = await axios.put(`${BACKEND_BASE_URL}/api/employee/update`, formData);
         return response.data;
      } catch (error) {
         console.error("Error updating employee:", error);
         throw error;
      }
   },

   deleteEmployee: async (id) => {
      try {
         await axios.delete(`${BACKEND_BASE_URL}/api/employee/delete/${id}`);
      } catch (error) {
         console.error("Error deleting employee:", error);
         throw error;
      }
   },
};
