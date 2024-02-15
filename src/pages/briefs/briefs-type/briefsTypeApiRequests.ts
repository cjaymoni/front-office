import { IBriefs } from "../brief/briefApiRequest";

import { axiosInstance } from "../../../utils/api-util";
import Swal from "sweetalert2";

const briefTypesEndpoint = "brief-types";

export const fetchBriefTypesRequest = () => {
  return axiosInstance
    .get(briefTypesEndpoint)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error;
    });
};

export const addNewBriefTypesRequest = (briefTypesData: any) => {
  return axiosInstance
    .post(briefTypesEndpoint, briefTypesData)
    .then((response) => {
      if (response.status === 201) {
        Swal.fire({
          title: "Brief Type added successfully",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        }).then(function () {
          window.location.assign("/brief-types");
        });
      }
      return response.data;
    })
    .catch((error) => {
      return error;
    });
};

export const updateBriefTypesRequest = (
  briefTypesData: any,
  briefTypesId: string
) => {
  return axiosInstance
    .put(`${briefTypesEndpoint}/${briefTypesId}`, briefTypesData)
    .then((response) => {
      if (response.status === 200) {
        Swal.fire({
          title: "Brief Type has been updated",
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

export const deleteBriefTypesRequest = (briefTypesId: string) => {
  return axiosInstance
    .delete(`${briefTypesEndpoint}/${briefTypesId}`)
    .then((response) => {
      if (response.status === 200) {
        Swal.fire({
          title: "Brief Type has been removed",
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

export const getBriefTypesByIdRequest = (briefTypesId: string) => {
  return axiosInstance
    .get(`${briefTypesEndpoint}/${briefTypesId}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error;
    });
};
export interface IBriefsType {
  id: string;
  name: string;
  description: string;
  briefs: IBriefs[];
}
