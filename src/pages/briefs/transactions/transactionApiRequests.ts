import { IStaff } from "../../staff/staffApiRequests";
import { IBriefLitigation } from "../briefs-litigation/briefsLitigationApiRequests";
import { axiosInstance } from "../../../utils/api-util";
import Swal from "sweetalert2";

const transactionEndpoint = "briefs/transactions";

export const fetchTransactionsRequest = () => {
  return axiosInstance
    .get(transactionEndpoint)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error;
    });
};

export const addNewTransactionRequest = (transactionData: any) => {
  return axiosInstance
    .post(transactionEndpoint, transactionData)
    .then((response) => {
      if (response.status === 201) {
        Swal.fire({
          title: "Transaction added successfully",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        }).then(function () {
          window.location.assign("/briefs/transactions");
        });
      }
      return response.data;
    })
    .catch((error) => {
      return error;
    });
};

export const updateTransactionRequest = (
  transactionData: any,
  transactionId: string
) => {
  return axiosInstance
    .put(`${transactionEndpoint}/${transactionId}`, transactionData)
    .then((response) => {
      if (response.status === 200) {
        Swal.fire({
          title: "Transaction has been updated",
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

export const deleteTransactionRequest = (transactionId: string) => {
  return axiosInstance
    .delete(`${transactionEndpoint}/${transactionId}`)
    .then((response) => {
      if (response.status === 200) {
        Swal.fire({
          title: "Transaction has been removed",
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

export const getTransactionByIdRequest = (transactionId: string) => {
  return axiosInstance
    .get(`${transactionEndpoint}/${transactionId}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error;
    });
};

export interface ITransaction {
  id?: string;
  name: string;
  user_id: IStaff[];
  litigation_id: string;
  litigation: IBriefLitigation;
}
