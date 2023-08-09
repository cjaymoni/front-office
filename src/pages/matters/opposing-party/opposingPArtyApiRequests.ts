import { IMatters } from "../matter/matterApiRequest";
import { axiosInstance } from "../../../utils/api-util";
import Swal from "sweetalert2";

const opposingPartiesEndpoint = "opposing-parties";

export const fetchOpposingPartiesRequest = () => {
  return axiosInstance
    .get(opposingPartiesEndpoint)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error;
    });
};

export const addNewOpposingPartiesRequest = (opposingPartiesData: any) => {
  return axiosInstance
    .post(opposingPartiesEndpoint, opposingPartiesData)
    .then((response) => {
      if (response.status === 201) {
        Swal.fire({
          title: "Opposing Party added successfully",
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

export const updateOpposingPartiesRequest = (
  opposingPartiesData: any,
  opposingPartiesId: string
) => {
  return axiosInstance
    .put(`${opposingPartiesEndpoint}/${opposingPartiesId}`, opposingPartiesData)
    .then((response) => {
      if (response.status === 200) {
        Swal.fire({
          title: "Opposing Party has been updated",
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

export const deleteOpposingPartiesRequest = (opposingPartiesId: string) => {
  return axiosInstance
    .delete(`${opposingPartiesEndpoint}/${opposingPartiesId}`)
    .then((response) => {
      if (response.status === 200) {
        Swal.fire({
          title: "Opposing Party has been removed",
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

export const getOpposingPartiesByIdRequest = (opposingPartiesId: string) => {
  return axiosInstance
    .get(`${opposingPartiesEndpoint}/${opposingPartiesId}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error;
    });
};
export interface IOpposingParty {
  id: string;
  matter_id: string;
  first_name: string;
  last_name: string;
  address: string;
  email: string;
  phone: string;
  matter: IMatters[];
}
