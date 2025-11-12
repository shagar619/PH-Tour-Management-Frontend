import config from "@/config";
import axios from "axios";


export const axiosInstance = axios.create({
     baseURL: config.baseUrl,
     withCredentials: true,
});


// Add a request interceptor
axiosInstance.interceptors.request.use(
function (config) {
     // Do something before request is sent
     // console.log("Axios", config);
     return config;
},
     function (error) {
     // Do something with request error
     return Promise.reject(error);
}
);

// Add a response interceptor
axiosInstance.interceptors.response.use(
     (response) => {
          return response;
     },
     async (error) => {
          // console.log(error.response.data.message, error.response.status);

     if (
          error.response.status === 500 &&
          error.response.data.message === "jwt expired"
     ) {
          console.log("Your token is expired!");

          try {
               const res = await axiosInstance.post("/auth/refresh-token");
               console.log("New Token arrived", res);
          } catch(error) {
               console.log(error)
          }
     }

     //* For Everything
     return Promise.reject(error);
     }
);