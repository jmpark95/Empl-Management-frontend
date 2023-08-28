import instance from "./AxiosConfig";

export const StreamService = {
   getAllStreams: async () => {
      const response = await instance.get(`/api/stream/streams`);
      return response.data;
   },

   getStreamById: async (id) => {
      const response = await instance.get(`/api/stream/${id}`);
      return response.data;
   },
};
