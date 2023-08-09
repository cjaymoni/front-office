import { axiosInstance } from "../../utils/api-util";
import Swal from "sweetalert2";

const departmentsEndpoint = "hr/departments";

export const fetchDepartmentsRequest = () => {
  return axiosInstance
    .get(departmentsEndpoint)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error;
    });
};

export const addNewDepartmentsRequest = (departmentsData: any) => {
  return axiosInstance
    .post(departmentsEndpoint, departmentsData)
    .then((response) => {
      if (response.status === 201) {
        Swal.fire({
          title: "Department added successfully",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        }).then(function () {
          window.location.assign("/departments");
        });
      }
      return response.data;
    })
    .catch((error) => {
      return error;
    });
};

export const updateDepartmentsRequest = (
  departmentsData: any,
  departmentsId: string
) => {
  return axiosInstance
    .put(`${departmentsEndpoint}/${departmentsId}`, departmentsData)
    .then((response) => {
      if (response.status === 200) {
        Swal.fire({
          title: "Department has been updated",
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

export const deleteDepartmentsRequest = (departmentsId: string) => {
  return axiosInstance
    .delete(`${departmentsEndpoint}/${departmentsId}`)
    .then((response) => {
      if (response.status === 200) {
        Swal.fire({
          title: "Department has been removed",
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

export const getDepartmentsByIdRequest = (departmentsId: string) => {
  return axiosInstance
    .get(`${departmentsEndpoint}/${departmentsId}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error;
    });
};

export interface IDepartment {
  id?: string;
  name: string;

  location?: string;
}
