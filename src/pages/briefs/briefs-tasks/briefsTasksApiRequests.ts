import { IStaff } from "../../staff/staffApiRequests";

import { axiosInstance } from "../../../utils/api-util";
import Swal from "sweetalert2";
import { IBriefs } from "../brief/briefApiRequest";

const briefTasksEndpoint = "brief-tasks";

export const fetchBriefTasksRequest = () => {
  return axiosInstance
    .get(briefTasksEndpoint)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error;
    });
};

export const addNewBriefTasksRequest = (briefTasksData: any) => {
  return axiosInstance
    .post(briefTasksEndpoint, briefTasksData)
    .then((response) => {
      if (response.status === 201) {
        Swal.fire({
          title: "Brief Task added successfully",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        }).then(function () {
          window.location.assign("/brief-tasks");
        });
      }
      return response.data;
    })
    .catch((error) => {
      return error;
    });
};

export const updateBriefTasksRequest = (
  briefTasksData: any,
  briefTasksId: string
) => {
  return axiosInstance
    .put(`${briefTasksEndpoint}/${briefTasksId}`, briefTasksData)
    .then((response) => {
      if (response.status === 200) {
        Swal.fire({
          title: "Brief Task has been updated",
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

export const deleteBriefTasksRequest = (briefTasksId: string) => {
  return axiosInstance
    .delete(`${briefTasksEndpoint}/${briefTasksId}`)
    .then((response) => {
      if (response.status === 200) {
        Swal.fire({
          title: "Brief Task has been removed",
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

export const getBriefTasksByIdRequest = (briefTasksId: string) => {
  return axiosInstance
    .get(`${briefTasksEndpoint}/${briefTasksId}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error;
    });
};
export interface IBriefsTasks {
  id: string;
  title: string;
  description: string;
  brief_id: string;
  assigner_id: string;
  assignee_id: string;
  expected_start_date: string;
  expected_due_date: string;
  actual_start_date: string;
  actual_end_date: string;
  status: string;
  creator_id: string;
  updator_id: string;
  brief: IBriefs[];
  assignee: IStaff;
  assigner: IStaff;
  created_by: IStaff;
  updated_by: IStaff;
}
