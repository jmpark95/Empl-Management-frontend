import axios from "axios";

const BACKEND_BASE_URL = `${import.meta.env.VITE_BACKEND_URL}/api/stream`;

export const StreamService = {
   getAllStreams: async () => {
      const response = await axios.get(`${BACKEND_BASE_URL}/streams`);
      return response.data;
   },
};
