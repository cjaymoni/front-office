import Swal from "sweetalert2";
import { axiosInstance } from "../../utils/api-util";
import { IStaff } from "../staff/staffApiRequests";

const tasksEndpoint = "tasks";

export const fetchTasksRequest = () => {
  return axiosInstance
    .get(tasksEndpoint)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error;
    });
};

export const addNewTasksRequest = (tasksData: any) => {
  return axiosInstance
    .post(tasksEndpoint, tasksData)
    .then((response) => {
      if (response.status === 201) {
        Swal.fire({
          title: "Task added successfully",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        }).then(function () {
          window.location.assign("/tasks");
        });
      }
      return response.data;
    })
    .catch((error) => {
      return error;
    });
};

export const updateTasksRequest = (tasksData: any, tasksId: string) => {
  return axiosInstance
    .put(`${tasksEndpoint}/${tasksId}`, tasksData)
    .then((response) => {
      if (response.status === 200) {
        Swal.fire({
          title: "Task has been updated",
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

export const deleteTasksRequest = (tasksId: string) => {
  return axiosInstance
    .delete(`${tasksEndpoint}/${tasksId}`)
    .then((response) => {
      if (response.status === 200) {
        Swal.fire({
          title: "Task has been removed",
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

export const getTasksByIdRequest = (tasksId: string) => {
  return axiosInstance
    .get(`${tasksEndpoint}/${tasksId}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error;
    });
};
export interface ITasks {
  id: string;
  task_name: string;
  task_id: string;
  assignee: IStaff;
  status: string;
  due_date: string;
  priority: string;
  task_type: string;
  comments: string;
  files: [];
  created_by: IStaff;
  date_created: string;
}

export enum ITaskStatus {
  PENDING = "pending",
  COMPLETED = "completed",
  IN_PROGRESS = "in_progress",
  OVERDUE = "overdue",
}

export enum ITaskPriority {
  HIGH = "high",
  MEDIUM = "medium",
  LOW = "low",
}
