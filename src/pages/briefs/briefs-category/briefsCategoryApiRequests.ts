import { IBriefs } from "../brief/briefApiRequest";
import { axiosInstance } from "../../../utils/api-util";
import Swal from "sweetalert2";

const categoriesEndpoint = "briefs/categories";

export const fetchBriefCategoryRequest = () => {
  return axiosInstance
    .get(categoriesEndpoint)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error;
    });
};

export const addNewBriefCategoryRequest = (categoriesData: any) => {
  return axiosInstance
    .post(categoriesEndpoint, categoriesData)
    .then((response) => {
      if (response.status === 201) {
        Swal.fire({
          title: "Category added successfully",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        }).then(function () {
          window.location.assign("/briefs/categories");
        });
      }
      return response.data;
    })
    .catch((error) => {
      return error;
    });
};

export const updateBriefCategoryRequest = (
  categoriesData: any,
  categoriesId: string
) => {
  return axiosInstance
    .put(`${categoriesEndpoint}/${categoriesId}`, categoriesData)
    .then((response) => {
      if (response.status === 200) {
        Swal.fire({
          title: "Category has been updated",
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

export const deleteBriefCategoryRequest = (categoriesId: string) => {
  return axiosInstance
    .delete(`${categoriesEndpoint}/${categoriesId}`)
    .then((response) => {
      if (response.status === 200) {
        Swal.fire({
          title: "Category has been removed",
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

export const getBriefCategoryByIdRequest = (categoriesId: string) => {
  return axiosInstance
    .get(`${categoriesEndpoint}/${categoriesId}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error;
    });
};
export interface IBriefsCategory {
  id: string;
  name: string;
  description: string;
  briefs: IBriefs[];
}
