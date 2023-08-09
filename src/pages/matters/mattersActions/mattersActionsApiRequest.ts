import { IStaff } from "../../staff/staffApiRequests";
import { IMatters } from "../matter/matterApiRequest";
import { axiosInstance } from "../../../utils/api-util";
import Swal from "sweetalert2";

const matterActionsEndpoint = "matter-actions";

export const fetchMatterActionsRequest = () => {
  return axiosInstance
    .get(matterActionsEndpoint)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error;
    });
};

export const addNewMatterActionsRequest = (matterActionsData: any) => {
  return axiosInstance
    .post(matterActionsEndpoint, matterActionsData)
    .then((response) => {
      if (response.status === 201) {
        Swal.fire({
          title: "Matter Action added successfully",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        }).then(function () {
          window.location.assign("/matter-actions/matter");
        });
      }
      return response.data;
    })
    .catch((error) => {
      return error;
    });
};

export const updateMatterActionsRequest = (
  matterActionsData: any,
  matterActionsId: string
) => {
  return axiosInstance
    .put(`${matterActionsEndpoint}/${matterActionsId}`, matterActionsData)
    .then((response) => {
      if (response.status === 200) {
        Swal.fire({
          title: "Matter Action has been updated",
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

export const deleteMatterActionsRequest = (matterActionsId: string) => {
  return axiosInstance
    .delete(`${matterActionsEndpoint}/${matterActionsId}`)
    .then((response) => {
      if (response.status === 200) {
        Swal.fire({
          title: "Matter Action has been removed",
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

export const getMatterActionsByIdRequest = (matterActionsId: string) => {
  return axiosInstance
    .get(`${matterActionsEndpoint}/${matterActionsId}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error;
    });
};
export interface IMattersActions {
  title: string;
  description: string;
  action_type: string;
  date: string;
  notes: string;
  status: string;
  assigned_by_id: string;
  assigned_to_id: string;
  assigned_by: IStaff;
  assigned_to: IStaff;
  matters: IMatters[];
}
