import { IStaff } from "../../staff/staffApiRequests";
import { ILeads } from "../leads/leadsApiRequests";

import { axiosInstance } from "../../../utils/api-util";
import Swal from "sweetalert2";

const attachmentsEndpoint = "crm/attachments";

export const fetchAttachmentsRequest = () => {
  return axiosInstance
    .get(attachmentsEndpoint)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error;
    });
};

export const addNewAttachmentsRequest = (attachmentsData: any) => {
  return axiosInstance
    .post(attachmentsEndpoint, attachmentsData)
    .then((response) => {
      if (response.status === 201) {
        Swal.fire({
          title: "Attachment added successfully",
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

export const updateAttachmentsRequest = (
  attachmentsData: any,
  attachmentsId: string
) => {
  return axiosInstance
    .put(`${attachmentsEndpoint}/${attachmentsId}`, attachmentsData)
    .then((response) => {
      if (response.status === 200) {
        Swal.fire({
          title: "Attachment has been updated",
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

export const deleteAttachmentsRequest = (attachmentsId: string) => {
  return axiosInstance
    .delete(`${attachmentsEndpoint}/${attachmentsId}`)
    .then((response) => {
      if (response.status === 200) {
        Swal.fire({
          title: "Attachment has been removed",
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

export const getAttachmentsByIdRequest = (attachmentsId: string) => {
  return axiosInstance
    .get(`${attachmentsEndpoint}/${attachmentsId}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error;
    });
};

export interface IAttachment {
  id: string;
  file_name: string;
  description: string;
  staff_id: string;
  leads: ILeads[];
  created_by: IStaff;
  updated_by: IStaff;
}
