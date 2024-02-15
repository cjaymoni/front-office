import { IStaff } from "../../staff/staffApiRequests";
import { IBriefs } from "../brief/briefApiRequest";
import { axiosInstance } from "../../../utils/api-util";
import Swal from "sweetalert2";
import { IBriefsActions } from "../briefsActions/briefActionsApiRequest";

const briefPaymentEndpoint = "brief-payment";

export const fetchBriefPaymentRequest = () => {
  return axiosInstance
    .get(briefPaymentEndpoint)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error;
    });
};

export const addNewBriefPaymentRequest = (briefPaymentData: any) => {
  return axiosInstance
    .post(briefPaymentEndpoint, briefPaymentData)
    .then((response) => {
      if (response.status === 201) {
        Swal.fire({
          title: "Brief Payment added successfully",
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

export const updateBriefPaymentRequest = (
  briefPaymentData: any,
  briefPaymentId: string
) => {
  return axiosInstance
    .put(`${briefPaymentEndpoint}/${briefPaymentId}`, briefPaymentData)
    .then((response) => {
      if (response.status === 200) {
        Swal.fire({
          title: "Brief Payment has been updated",
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

export const deleteBriefPaymentRequest = (briefPaymentId: string) => {
  return axiosInstance
    .delete(`${briefPaymentEndpoint}/${briefPaymentId}`)
    .then((response) => {
      if (response.status === 200) {
        Swal.fire({
          title: "Brief Payment has been removed",
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

export const getBriefPaymentByIdRequest = (briefPaymentId: string) => {
  return axiosInstance
    .get(`${briefPaymentEndpoint}/${briefPaymentId}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error;
    });
};
export interface IBriefPayment {
  brief_id: string;
  reference: string;
  description: string;
  invoice_reference: string;
  amount: string;
  currency: string;
  payment_date: string;
  mode: string;
  id: string;
  brief: IBriefs;
}
