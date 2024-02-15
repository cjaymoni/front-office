import Swal from "sweetalert2";
import { axiosInstance } from "../../../../utils/api-util";

const incomingDispatchEndpoint = "frontoffice/dispatches/incomings";

export const fetchIncomingDispatchRequest = () => {
  return axiosInstance
    .get(incomingDispatchEndpoint)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error;
    });
};

export const addNewIncomingDispatchRequest = (incomingDispatchData: any) => {
  return axiosInstance
    .post(incomingDispatchEndpoint, incomingDispatchData)
    .then((response) => {
      if (response.status === 201) {
        Swal.fire({
          title: "Incoming Dispatch added successfully",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        }).then(function () {
          window.location.assign("/incoming-dispatch");
        });
      }
      return response.data;
    })
    .catch((error) => {
      return error;
    });
};

export const updateIncomingDispatchRequest = (
  incomingDispatchData: any,
  incomingDispatchId: string
) => {
  return axiosInstance
    .put(
      `${incomingDispatchEndpoint}/${incomingDispatchId}`,
      incomingDispatchData
    )
    .then((response) => {
      if (response.status === 200) {
        Swal.fire({
          title: "Incoming Dispatch has been updated",
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

export const deleteIncomingDispatchRequest = (incomingDispatchId: string) => {
  return axiosInstance
    .delete(`${incomingDispatchEndpoint}/${incomingDispatchId}`)
    .then((response) => {
      if (response.status === 200) {
        Swal.fire({
          title: "Incoming Dispatch has been removed",
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

export const getIncomingDispatchByIdRequest = (incomingDispatchId: string) => {
  return axiosInstance
    .get(`${incomingDispatchEndpoint}/${incomingDispatchId}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error;
    });
};

export interface IIncomingDispatch {
  document_title?: string;
  description?: string;
  client?: string;
  to_whom_id?: string;
  delivered_to_id?: string;
  receipt_acknowledged?: boolean;
  sender_name?: string;
  courier_name?: string;
  courier_phone?: string;
  id?: string;
  status: IDispatchStatus;
  time: string;
  remarks: string;
}

export enum IDispatchStatus {
  Lodged = "lodged",
  "Deposited for dispatch" = "deposited for dispatch",
  Delivered = "delivered",
  Returned = "returned",
}
