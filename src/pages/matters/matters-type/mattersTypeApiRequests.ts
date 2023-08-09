import { IMatters } from "../matter/matterApiRequest";

import { axiosInstance } from "../../../utils/api-util";
import Swal from "sweetalert2";

const matterTypesEndpoint = "matter-types";

export const fetchMatterTypesRequest = () => {
  return axiosInstance
    .get(matterTypesEndpoint)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error;
    });
};

export const addNewMatterTypesRequest = (matterTypesData: any) => {
  return axiosInstance
    .post(matterTypesEndpoint, matterTypesData)
    .then((response) => {
      if (response.status === 201) {
        Swal.fire({
          title: "Matter Type added successfully",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        }).then(function () {
          window.location.assign("/matter-types");
        });
      }
      return response.data;
    })
    .catch((error) => {
      return error;
    });
};

export const updateMatterTypesRequest = (
  matterTypesData: any,
  matterTypesId: string
) => {
  return axiosInstance
    .put(`${matterTypesEndpoint}/${matterTypesId}`, matterTypesData)
    .then((response) => {
      if (response.status === 200) {
        Swal.fire({
          title: "Matter Type has been updated",
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

export const deleteMatterTypesRequest = (matterTypesId: string) => {
  return axiosInstance
    .delete(`${matterTypesEndpoint}/${matterTypesId}`)
    .then((response) => {
      if (response.status === 200) {
        Swal.fire({
          title: "Matter Type has been removed",
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

export const getMatterTypesByIdRequest = (matterTypesId: string) => {
  return axiosInstance
    .get(`${matterTypesEndpoint}/${matterTypesId}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error;
    });
};
export interface IMattersType {
  id: string;
  name: string;
  description: string;
  matters: IMatters[];
}
