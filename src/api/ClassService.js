import instance from "./AxiosConfig";

export const ClassService = {
   getAllClasses: async (id) => {
      const response = await instance.get(`/api/class/classes-by-stream`, {
         params: {
            streamId: id,
         },
      });
      return response.data;
   },

   createClass: async (formikData) => {
      await instance.post(`/api/class/create`, formikData);
   },

   getClass: async (classId) => {
      const response = await instance.get(`/api/class/${classId}`);
      return response.data;
   },

   updateClass: async (classId, values) => {
      const response = await instance.put(`/api/class/${classId}`, values);
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
