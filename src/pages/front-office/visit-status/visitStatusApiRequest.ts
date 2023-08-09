import Swal from "sweetalert2";
import { axiosInstance } from "../../../utils/api-util";

const visitStatusEndpoint = "frontoffice/visits/visit_statuses";

export const fetchVisitStatusRequest = () => {
  return axiosInstance
    .get(visitStatusEndpoint)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error;
    });
};

export const addNewVisitStatusRequest = (visitStatusData: any) => {
  return axiosInstance
    .post(visitStatusEndpoint, visitStatusData)
    .then((response) => {
      if (response.status === 201) {
        Swal.fire({
          title: "Visit Status added successfully",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        }).then(function () {
          window.location.assign("/front-office/visit-status");
        });
      }
      return response.data;
    })
    .catch((error) => {
      return error;
    });
};

export const updateVisitStatusRequest = (
  visitStatusData: any,
  visitStatusId: string
) => {
  return axiosInstance
    .put(`${visitStatusEndpoint}/${visitStatusId}`, visitStatusData)
    .then((response) => {
      if (response.status === 200) {
        Swal.fire({
          title: "Visit Status has been updated",
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

export const deleteVisitStatusRequest = (visitStatusId: string) => {
  return axiosInstance
    .delete(`${visitStatusEndpoint}/${visitStatusId}`)
    .then((response) => {
      if (response.status === 200) {
        Swal.fire({
          title: "Visit Status has been removed",
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

export const getVisitStatusByIdRequest = (visitStatusId: string) => {
  return axiosInstance
    .get(`${visitStatusEndpoint}/${visitStatusId}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error;
    });
};

export interface IVisitStatus {
  status: string;
  description?: string;
  id?: string;
}
