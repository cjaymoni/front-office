import { axiosInstance } from "../../../utils/api-util";
import Swal from "sweetalert2";

const judgesEndpoint = "matters/judges";

export const fetchJudgesRequest = () => {
  return axiosInstance
    .get(judgesEndpoint)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error;
    });
};

export const addNewJudgesRequest = (judgesData: any) => {
  return axiosInstance
    .post(judgesEndpoint, judgesData)
    .then((response) => {
      if (response.status === 201) {
        Swal.fire({
          title: "Judge added successfully",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        }).then(function () {
          window.location.assign("/matters/judges");
        });
      }
      return response.data;
    })
    .catch((error) => {
      return error;
    });
};

export const updateJudgesRequest = (judgesData: any, judgesId: string) => {
  return axiosInstance
    .put(`${judgesEndpoint}/${judgesId}`, judgesData)
    .then((response) => {
      if (response.status === 200) {
        Swal.fire({
          title: "Judge has been updated",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        }).then(function () {
          window.location.reload();
        });
      }
      return response.data;
    })
    .catch((error) => {
      return error;
    });
};

export const deleteJudgesRequest = (judgesId: string) => {
  return axiosInstance
    .delete(`${judgesEndpoint}/${judgesId}`)
    .then((response) => {
      if (response.status === 200) {
        Swal.fire({
          title: "Judge has been removed",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        }).then(function () {
          window.location.reload();
        });
      }

      return response.data;
    })
    .catch((error) => {
      return error;
    });
};

export const getJudgesByIdRequest = (judgesId: string) => {
  return axiosInstance
    .get(`${judgesEndpoint}/${judgesId}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error;
    });
};
export interface IJudge {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
}
