import Swal from "sweetalert2";
import { axiosInstance } from "../../../../utils/api-util";
import { IStaff } from "../../../staff/staffApiRequests";
import { IDispatchStatus } from "../incoming-dispatches/incomingDispatchesApiRequests";

const outgoingDispatchEndpoint = "frontoffice/dispatches/outgoings";

export const fetchOutgoingDispatchRequest = () => {
  return axiosInstance
    .get(outgoingDispatchEndpoint)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error;
    });
};

export const addNewOutgoingDispatchRequest = (outgoingDispatchData: any) => {
  return axiosInstance
    .post(outgoingDispatchEndpoint, outgoingDispatchData)
    .then((response) => {
      if (response.status === 201) {
        Swal.fire({
          title: "Outgoing Dispatch added successfully",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        }).then(function () {
          window.location.assign("/outgoing-dispatch");
        });
      }
      return response.data;
    })
    .catch((error) => {
      return error;
    });
};

export const updateOutgoingDispatchRequest = (
  outgoingDispatchData: any,
  outgoingDispatchId: string
) => {
  return axiosInstance
    .put(
      `${outgoingDispatchEndpoint}/${outgoingDispatchId}`,
      outgoingDispatchData
    )
    .then((response) => {
      if (response.status === 200) {
        Swal.fire({
          title: "Outgoing Dispatch has been updated",
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

export const deleteOutgoingDispatchRequest = (outgoingDispatchId: string) => {
  return axiosInstance
    .delete(`${outgoingDispatchEndpoint}/${outgoingDispatchId}`)
    .then((response) => {
      if (response.status === 200) {
        Swal.fire({
          title: "Outgoing Dispatch has been removed",
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

export const getOutgoingDispatchByIdRequest = (outgoingDispatchId: string) => {
  return axiosInstance
    .get(`${outgoingDispatchEndpoint}/${outgoingDispatchId}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error;
    });
};

export interface IOutgoingDispatch {
  serial_no: string;
  document_title?: string;
  typist_id?: string;
  reference_number: string;
  date: string;
  partner_id?: string;
  creator_id?: string;
  updator_id?: string;
  partner?: IStaff;
  typist?: IStaff;
  document_name: string;

  id?: string;
  courier_name?: string;
  courier_phone?: string;
  status: IDispatchStatus;

  courier: string;
  time: string;
  remarks: string;
}
