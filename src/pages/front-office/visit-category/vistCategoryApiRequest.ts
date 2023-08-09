import Swal from "sweetalert2";
import { axiosInstance } from "../../../utils/api-util";

const visitCategoryEndpoint = "frontoffice/visits/visit_categories";

export const fetchVisitCategoryRequest = () => {
  return axiosInstance
    .get(visitCategoryEndpoint)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error;
    });
};

export const addNewVisitCategoryRequest = (visitCategoryData: any) => {
  return axiosInstance
    .post(visitCategoryEndpoint, visitCategoryData)
    .then((response) => {
      if (response.status === 201) {
        Swal.fire({
          title: "Visit Category added successfully",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        }).then(function () {
          window.location.assign("/front-office/visit-category");
        });
      }
      return response.data;
    })
    .catch((error) => {
      return error;
    });
};

export const updateVisitCategoryRequest = (
  visitCategoryData: any,
  visitCategoryId: string
) => {
  return axiosInstance
    .put(`${visitCategoryEndpoint}/${visitCategoryId}`, visitCategoryData)
    .then((response) => {
      if (response.status === 200) {
        Swal.fire({
          title: "Visit Category has been updated",
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

export const deleteVisitCategoryRequest = (visitCategoryId: string) => {
  return axiosInstance
    .delete(`${visitCategoryEndpoint}/${visitCategoryId}`)
    .then((response) => {
      if (response.status === 200) {
        Swal.fire({
          title: "Visit Category has been removed",
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

export const getVisitCategoryByIdRequest = (visitCategoryId: string) => {
  return axiosInstance
    .get(`${visitCategoryEndpoint}/${visitCategoryId}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error;
    });
};

export interface IVisitCategory {
  category: string;
  description?: string;
  id?: string;
}
