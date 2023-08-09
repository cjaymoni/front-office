import { IStaff } from "../../staff/staffApiRequests";
import { IReminders } from "../reminders/remindersApiRequests";
import { ITeams } from "../teams/teamsApiRequests";
import { axiosInstance } from "../../../utils/api-util";
import Swal from "sweetalert2";

const actionsEndpoint = "crm/actions";

export const fetchActionsRequest = () => {
  return axiosInstance
    .get(actionsEndpoint)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error;
    });
};

export const addNewActionsRequest = (actionsData: any) => {
  return axiosInstance
    .post(actionsEndpoint, actionsData)
    .then((response) => {
      if (response.status === 201) {
        Swal.fire({
          title: "Action added successfully",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        }).then(function () {
          window.location.assign("/crm/actions");
        });
      }
      return response.data;
    })
    .catch((error) => {
      return error;
    });
};

export const updateActionsRequest = (actionsData: any, actionsId: string) => {
  return axiosInstance
    .put(`${actionsEndpoint}/${actionsId}`, actionsData)
    .then((response) => {
      if (response.status === 200) {
        Swal.fire({
          title: "Action has been updated",
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

export const deleteActionsRequest = (actionsId: string) => {
  return axiosInstance
    .delete(`${actionsEndpoint}/${actionsId}`)
    .then((response) => {
      if (response.status === 200) {
        Swal.fire({
          title: "Action has been removed",
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

export const getActionsByIdRequest = (actionsId: string) => {
  return axiosInstance
    .get(`${actionsEndpoint}/${actionsId}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error;
    });
};
export interface IActions {
  name;
  description;
  priority;
  start_date_time;
  close_date_time;
  duration: number;
  is_active: boolean;
  status_id: string;
  assigned_users_id: string[];
  id?: string;
  reminders: IReminders[];
  staff_attendees: IStaff[];
  contacts: IStaff[];
  teams: ITeams[];
  assigned_users: IStaff[];
}
