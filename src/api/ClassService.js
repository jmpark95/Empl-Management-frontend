import axios from "axios";

const BACKEND_BASE_URL = `${import.meta.env.VITE_BACKEND_URL}/api/class`;

export const ClassService = {
   getAllClasses: async (id) => {
      const response = await axios.get(`${BACKEND_BASE_URL}/classes-by-stream`, {
         params: {
            streamId: id,
         },
      });
      return response.data;
   },

   createClass: async (formikData) => {
      await axios.post(`${BACKEND_BASE_URL}/create`, formikData);
   },

   getClass: async (classId) => {
      const response = await axios.get(`${BACKEND_BASE_URL}/${classId}`);
      return response.data;
   },

   updateClass: async (classId, values) => {
      const response = await axios.put(`${BACKEND_BASE_URL}/${classId}`, values);
      return response.data;
   },

   // getAllStreams: async () => {
   //    const response = await axios.get(`${BACKEND_BASE_URL}/classes`);
   //    return response.data;
   // },

   // getAllStreamNames: async () => {
   //    const response = await axios.get(`${BACKEND_BASE_URL}/stream-names`);
   //    return response.data;
   // },

   // getStreamNameById: async (id) => {
   //    const response = await axios.get(`${BACKEND_BASE_URL}/stream-name/${id}`);
   //    return response.data;
   // },
};
