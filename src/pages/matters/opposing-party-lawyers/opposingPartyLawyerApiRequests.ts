import { IMatters } from "../matter/matterApiRequest";
import { axiosInstance } from "../../../utils/api-util";
import Swal from "sweetalert2";

const OpposingPartyLawyersEndpoint = "opposing-parties";

export const fetchOpposingPartyLawyersRequest = () => {
  return axiosInstance
    .get(OpposingPartyLawyersEndpoint)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error;
    });
};

export const addNewOpposingPartyLawyersRequest = (
  OpposingPartyLawyersData: any
) => {
  return axiosInstance
    .post(OpposingPartyLawyersEndpoint, OpposingPartyLawyersData)
    .then((response) => {
      if (response.status === 201) {
        Swal.fire({
          title: "Opposing Party Lawyer added successfully",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        }).then(function () {
          window.location.assign("/opposing-parties");
        });
      }
      return response.data;
    })
    .catch((error) => {
      return error;
    });
};

export const updateOpposingPartyLawyersRequest = (
  OpposingPartyLawyersData: any,
  OpposingPartyLawyersId: string
) => {
  return axiosInstance
    .put(
      `${OpposingPartyLawyersEndpoint}/${OpposingPartyLawyersId}`,
      OpposingPartyLawyersData
    )
    .then((response) => {
      if (response.status === 200) {
        Swal.fire({
          title: "Opposing Party Lawyer has been updated",
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

export const deleteOpposingPartyLawyersRequest = (
  OpposingPartyLawyersId: string
) => {
  return axiosInstance
    .delete(`${OpposingPartyLawyersEndpoint}/${OpposingPartyLawyersId}`)
    .then((response) => {
      if (response.status === 200) {
        Swal.fire({
          title: "Opposing Party Lawyer has been removed",
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

export const getOpposingPartiesByIdRequest = (
  OpposingPartyLawyersId: string
) => {
  return axiosInstance
    .get(`${OpposingPartyLawyersEndpoint}/${OpposingPartyLawyersId}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error;
    });
};

export interface IOpposingPartyLawyer {
  id: string;
  matter_id: string;
  first_name: string;
  last_name: string;
  description: string;
  email: string;
  phone: string;
  matter: IMatters[];
}
