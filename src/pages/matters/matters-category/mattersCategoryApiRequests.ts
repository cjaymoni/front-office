import { IMatters } from "../matter/matterApiRequest";
import { axiosInstance } from "../../../utils/api-util";
import Swal from "sweetalert2";

const categoriesEndpoint = "matters/categories";

export const fetchMatterCategoryRequest = () => {
  return axiosInstance
    .get(categoriesEndpoint)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error;
    });
};

export const addNewMatterCategoryRequest = (categoriesData: any) => {
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
          window.location.assign("/matters/categories");
        });
      }
      return response.data;
    })
    .catch((error) => {
      return error;
    });
};

export const updateMatterCategoryRequest = (
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

export const deleteMatterCategoryRequest = (categoriesId: string) => {
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

export const getMatterCategoryByIdRequest = (categoriesId: string) => {
  return axiosInstance
    .get(`${categoriesEndpoint}/${categoriesId}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error;
    });
};
export interface IMattersCategory {
  id: string;
  name: string;
  description: string;
  matters: IMatters[];
}
