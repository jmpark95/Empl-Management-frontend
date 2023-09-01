import axios from "axios";

export const AuthService = {
   login: async (formikData) => {
      sessionStorage.clear();

      const response = await axios.post(
         `${import.meta.env.VITE_BACKEND_URL}authenticatee`,
         {},
         {
            auth: {
               username: formikData.email,
               password: formikData.password,
            },
         }
      );

      sessionStorage.setItem("access_token", response.data.access_token);
      sessionStorage.setItem("expires_in", response.data.expires_in);

      return response.data;
   },
};
