import { IBriefs } from "../brief/briefApiRequest";

import { axiosInstance } from "../../../utils/api-util";
import Swal from "sweetalert2";
import { IBriefsActivity } from "../brief-activity/briefsActivityApiRequests";

const briefExpenseEndpoint = "brief-entries";

export const fetchBriefExpenseRequest = () => {
  return axiosInstance
    .get(briefExpenseEndpoint)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error;
    });
};

export const addNewBriefExpenseRequest = (briefExpenseData: any) => {
  return axiosInstance
    .post(briefExpenseEndpoint, briefExpenseData)
    .then((response) => {
      if (response.status === 201) {
        Swal.fire({
          title: "Brief Expense added successfully",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        }).then(function () {
          window.location.assign("/brief-entries");
        });
      }
      return response.data;
    })
    .catch((error) => {
      return error;
    });
};

export const updateBriefExpenseRequest = (
  briefExpenseData: any,
  briefExpenseId: string
) => {
  return axiosInstance
    .put(`${briefExpenseEndpoint}/${briefExpenseId}`, briefExpenseData)
    .then((response) => {
      if (response.status === 200) {
        Swal.fire({
          title: "Brief Expense has been updated",
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

export const deleteBriefExpenseRequest = (briefExpenseId: string) => {
  return axiosInstance
    .delete(`${briefExpenseEndpoint}/${briefExpenseId}`)
    .then((response) => {
      if (response.status === 200) {
        Swal.fire({
          title: "Brief Expense has been removed",
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

export const getBriefExpenseByIdRequest = (briefExpenseId: string) => {
  return axiosInstance
    .get(`${briefExpenseEndpoint}/${briefExpenseId}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error;
    });
};
export interface IBriefExpense {
  title: string;
  description: string;
  brief_id: string;
  phase_code_id: string;
  expense_code_id: string;
  amount: string;
  currency: string;
  date: string;

  phase_code: string;
  brief: string;
}
