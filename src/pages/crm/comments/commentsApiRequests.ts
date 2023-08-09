import { axiosInstance } from "../../../utils/api-util";
import Swal from "sweetalert2";

const commentsEndpoint = "crm/comments";

export const fetchCommentsRequest = () => {
  return axiosInstance
    .get(commentsEndpoint)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error;
    });
};

export const addNewCommentsRequest = (commentsData: any) => {
  return axiosInstance
    .post(commentsEndpoint, commentsData)
    .then((response) => {
      if (response.status === 201) {
        Swal.fire({
          title: "Comment added successfully",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        }).then(function () {
          window.location.assign("/staff-targets");
        });
      }
      return response.data;
    })
    .catch((error) => {
      return error;
    });
};

export const updateCommentsRequest = (
  commentsData: any,
  commentsId: string
) => {
  return axiosInstance
    .put(`${commentsEndpoint}/${commentsId}`, commentsData)
    .then((response) => {
      if (response.status === 200) {
        Swal.fire({
          title: "Comment has been updated",
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

export const deleteCommentsRequest = (commentsId: string) => {
  return axiosInstance
    .delete(`${commentsEndpoint}/${commentsId}`)
    .then((response) => {
      if (response.status === 200) {
        Swal.fire({
          title: "Comment has been removed",
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

export const getCommentsByIdRequest = (commentsId: string) => {
  return axiosInstance
    .get(`${commentsEndpoint}/${commentsId}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error;
    });
};

export interface IComment {
  id: string;
  comment: string;
  comment_on: string;
  staff_id: string;
  commented_by: string;
  leads: string[];
}
