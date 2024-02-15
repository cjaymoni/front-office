import { axiosInstance } from "./api-util";

const apiUrl = "https://api.countrystatecity.in/v1/countries";

axiosInstance.request({
  url: apiUrl,
  headers: {
    "X-CSCAPI-KEY": "eXphRFdFY3FsbVZFVk5UMDZ4cFJLS3JkUXJ4dGx6Zm4yZlNGdjVPWg==",
  },
});

// export const getCountries = async () => {
//   try {
//     await axiosInstance.get(apiUrl).then((response) => {
//       return response.data;
//     });
//   } catch (error) {
//     console.log(error);
//   }
// };

export const getCountries = () => {
  return axiosInstance
    .get(apiUrl)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error;
    });
};
