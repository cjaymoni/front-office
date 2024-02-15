import { IStaff } from "../../staff/staffApiRequests";
import { IBriefs } from "../brief/briefApiRequest";
import { axiosInstance } from "../../../utils/api-util";
import Swal from "sweetalert2";

const briefActionsEndpoint = "brief-actions";

export const fetchBriefActionsRequest = () => {
  return axiosInstance
    .get(briefActionsEndpoint)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error;
    });
};

export const addNewBriefActionsRequest = (briefActionsData: any) => {
  return axiosInstance
    .post(briefActionsEndpoint, briefActionsData)
    .then((response) => {
      if (response.status === 201) {
        Swal.fire({
          title: "Brief Action added successfully",
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

export const updateBriefActionsRequest = (
  briefActionsData: any,
  briefActionsId: string
) => {
  return axiosInstance
    .put(`${briefActionsEndpoint}/${briefActionsId}`, briefActionsData)
    .then((response) => {
      if (response.status === 200) {
        Swal.fire({
          title: "Brief Action has been updated",
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

export const deleteBriefActionsRequest = (briefActionsId: string) => {
  return axiosInstance
    .delete(`${briefActionsEndpoint}/${briefActionsId}`)
    .then((response) => {
      if (response.status === 200) {
        Swal.fire({
          title: "Brief Action has been removed",
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

export const getBriefActionsByIdRequest = (briefActionsId: string) => {
  return axiosInstance
    .get(`${briefActionsEndpoint}/${briefActionsId}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error;
    });
};
export interface IBriefsActions {
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
  briefs: IBriefs[];

  location: string;
  cancelled: string;
  reason_for_cancillation: string;

  creator_id: string;

  created_by: string;

  staffs_assigned: string[];

  participants: string[];

  brief: IBriefs;
}
