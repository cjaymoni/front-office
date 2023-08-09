import axios from "axios";
import Swal from "sweetalert2";

// const apiUrl = import.meta.env.VITE_API_URL;
const apiUrl = "http://68.183.68.210:8009/";

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

export const axiosInstance = axios.create({
  baseURL: apiUrl,
  timeout: 5000,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    Swal.fire({
      title: '<i class="pi  pi-spin pi-spinner" ></i><br>Loading',
      text: "please wait",
      // iconHtml:'<i class="pi  pi-spin pi-spinner"></i>',
      // iconColor:'blue',
      showConfirmButton: false,
    });

    return config;
  },
  (error) => {
    Swal.fire({
      title: "Request Error",
      icon: "error",
      html: "<div>Try again</div>",
      showConfirmButton: false,
      timer: 2000,
    });
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    Swal.close();
    return response;
  },
  (error) => {
    const originalRequest = error.config;
    if (
      error.code === "ECONNABORTED" &&
      error.message.indexOf("timeout") !== -1 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      return (
        axios.request(originalRequest),
        Swal.fire({
          title: "Request timeout",
          html: "<div>Try Again </div>",
          icon: "error",
          showConfirmButton: false,
          timer: 3000,
        })
      );
    }
    if (error?.code === "ERR_NETWORK") {
      Swal.fire({
        title: "Request Failed",
        icon: "error",
        html: "<div>An error occurred, Try again</div>",
        showConfirmButton: false,
        timer: 2000,
      }).then(function () {
        scrollToTop();
      });
    }
    if (error.response.status === 422) {
      Swal.fire({
        title: "Request Failed",
        icon: "error",
        html: "<div>Data Validation Error</div>",
        showConfirmButton: false,
        timer: 2000,
      }).then(function () {
        scrollToTop();
      });
    } else if (error.response.status === 417) {
      Swal.fire({
        title: "Request Failed",

        icon: "error",
        html: "<div>User Account Not Verified</div>",
        showConfirmButton: false,
        timer: 3000,
      });
    } else if (error.response.status === 409) {
      Swal.fire({
        title: "Request Error",
        icon: "error",
        text: "Item already exits",
        showConfirmButton: true,
      });
    } else if (error?.response?.status === 500) {
      Swal.fire({
        title: "Request Error",
        icon: "error",
        html: "<div>Internal server error</div>",
        showConfirmButton: true,
        timer: 3000,
      });
    } else if (error.response.status === 404) {
      Swal.fire({
        title: "Request Failed",

        icon: "error",
        html: "<div>Not found<br/> Check Data </div>",
        showConfirmButton: false,
        timer: 2000,
      });
    } else if (error.response.status === 401) {
      Swal.fire({
        title: "Request Failed",

        icon: "error",
        text: "Unauthorized",
        showConfirmButton: false,
        timer: 3000,
      });
    } else if (error.response.status === 400) {
      Swal.fire({
        title: "Request Failed",

        icon: "error",
        html: "<div>Bad Request<br/> Check Data </div>",
        showConfirmButton: false,
        timer: 2000,
      });
    } else if (error.response.status === 408) {
      Swal.fire({
        title: "Request Failed",
        icon: "error",
        text: "Request Timed Out",
        showConfirmButton: false,
        timer: 2000,
      });
    }

    return Promise.reject(error);
  }
);
