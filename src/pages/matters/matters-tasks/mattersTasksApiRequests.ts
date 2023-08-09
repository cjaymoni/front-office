import { IStaff } from "../../staff/staffApiRequests";
import { IMatters } from "../matter/matterApiRequest";

import { axiosInstance } from "../../../utils/api-util";
import Swal from "sweetalert2";

const matterTasksEndpoint = "matter-tasks";

export const fetchMatterTasksRequest = () => {
  return axiosInstance
    .get(matterTasksEndpoint)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error;
    });
};

export const addNewMatterTasksRequest = (matterTasksData: any) => {
  return axiosInstance
    .post(matterTasksEndpoint, matterTasksData)
    .then((response) => {
      if (response.status === 201) {
        Swal.fire({
          title: "Matter Task added successfully",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        }).then(function () {
          window.location.assign("/matter-tasks");
        });
      }
      return response.data;
    })
    .catch((error) => {
      return error;
    });
};

export const updateMatterTasksRequest = (
  matterTasksData: any,
  matterTasksId: string
) => {
  return axiosInstance
    .put(`${matterTasksEndpoint}/${matterTasksId}`, matterTasksData)
    .then((response) => {
      if (response.status === 200) {
        Swal.fire({
          title: "Matter Task has been updated",
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

export const deleteMatterTasksRequest = (matterTasksId: string) => {
  return axiosInstance
    .delete(`${matterTasksEndpoint}/${matterTasksId}`)
    .then((response) => {
      if (response.status === 200) {
        Swal.fire({
          title: "Matter Task has been removed",
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

export const getMatterTasksByIdRequest = (matterTasksId: string) => {
  return axiosInstance
    .get(`${matterTasksEndpoint}/${matterTasksId}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error;
    });
};
export interface IMattersTasks {
  id: string;
  title: string;
  description: string;
  matter_id: string;
  assigner_id: string;
  assignee_id: string;
  expected_start_date: string;
  expected_due_date: string;
  actual_start_date: string;
  actual_end_date: string;
  status: string;
  creator_id: string;
  updator_id: string;
  matter: IMatters[];
  assignee: IStaff;
  assigner: IStaff;
  created_by: IStaff;
  updated_by: IStaff;
}
