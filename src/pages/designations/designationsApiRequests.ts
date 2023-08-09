import { axiosInstance } from "../../utils/api-util";
import Swal from "sweetalert2";

const designationEndpoint = "hr/designations";

export const fetchDesignationsRequest = () => {
  return axiosInstance
    .get(designationEndpoint)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error;
    });
};

export const addNewDesignationsRequest = (designationsData: any) => {
  return axiosInstance
    .post(designationEndpoint, designationsData)
    .then((response) => {
      if (response.status === 201) {
        Swal.fire({
          title: "Designation added successfully",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        }).then(function () {
          window.location.assign("/designations");
        });
      }
      return response.data;
    })
    .catch((error) => {
      return error;
    });
};

export const updateDesignationsRequest = (
  designationsData: any,
  designationsId: string
) => {
  return axiosInstance
    .put(`${designationEndpoint}/${designationsId}`, designationsData)
    .then((response) => {
      if (response.status === 200) {
        Swal.fire({
          title: "Designation has been updated",
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

export const deleteDesignationsRequest = (designationsId: string) => {
  return axiosInstance
    .delete(`${designationEndpoint}/${designationsId}`)
    .then((response) => {
      if (response.status === 200) {
        Swal.fire({
          title: "Designation has been removed",
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

export const getDesignationsByIdRequest = (designationsId: string) => {
  return axiosInstance
    .get(`${designationEndpoint}/${designationsId}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error;
    });
};

export interface IDesignation {
  id?: string;
  title: string;
  min_salary: number;
  maximum_salary: number;
  rate_per_case: number;
  rate_per_hour: number;
  commission_per_case: number;
}
