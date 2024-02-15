import { IStaff } from "../../staff/staffApiRequests";
import { IBriefs } from "../brief/briefApiRequest";
import { axiosInstance } from "../../../utils/api-util";
import Swal from "sweetalert2";

const legalOpinionEndpoint = "brief-actions";

export const fetchLegalOpinionRequest = () => {
  return axiosInstance
    .get(legalOpinionEndpoint)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error;
    });
};

export const addNewLegalOpinionRequest = (legalOpinionData: any) => {
  return axiosInstance
    .post(legalOpinionEndpoint, legalOpinionData)
    .then((response) => {
      if (response.status === 201) {
        Swal.fire({
          title: "Legal Opinion added successfully",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        }).then(function () {
          window.location.assign("/brief-actions/brief");
        });
      }
      return response.data;
    })
    .catch((error) => {
      return error;
    });
};

export const updateLegalOpinionRequest = (
  legalOpinionData: any,
  legalOpinionId: string
) => {
  return axiosInstance
    .put(`${legalOpinionEndpoint}/${legalOpinionId}`, legalOpinionData)
    .then((response) => {
      if (response.status === 200) {
        Swal.fire({
          title: "Legal Opinion has been updated",
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

export const deleteLegalOpinionRequest = (legalOpinionId: string) => {
  return axiosInstance
    .delete(`${legalOpinionEndpoint}/${legalOpinionId}`)
    .then((response) => {
      if (response.status === 200) {
        Swal.fire({
          title: "Legal Opinion has been removed",
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

export const getLegalOpinionByIdRequest = (legalOpinionId: string) => {
  return axiosInstance
    .get(`${legalOpinionEndpoint}/${legalOpinionId}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error;
    });
};
export interface ILegalOpinion {
  title: string;
  description: string;
  brief_id: string;

  brief: IBriefs;
}
