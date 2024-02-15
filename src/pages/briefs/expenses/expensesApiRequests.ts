import { IBriefs } from "../brief/briefApiRequest";
import { IPhaseCodes } from "../phase-codes/phaseCodesApiRequests";

import { axiosInstance } from "../../../utils/api-util";
import Swal from "sweetalert2";

const expensesEndpoint = "expenses";

export const fetchExpensesRequest = () => {
  return axiosInstance
    .get(expensesEndpoint)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error;
    });
};

export const addNewExpensesRequest = (expensesData: any) => {
  return axiosInstance
    .post(expensesEndpoint, expensesData)
    .then((response) => {
      if (response.status === 201) {
        Swal.fire({
          title: "Expense added successfully",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        }).then(function () {
          window.location.assign("/expenses");
        });
      }
      return response.data;
    })
    .catch((error) => {
      return error;
    });
};

export const updateExpensesRequest = (
  expensesData: any,
  expensesId: string
) => {
  return axiosInstance
    .put(`${expensesEndpoint}/${expensesId}`, expensesData)
    .then((response) => {
      if (response.status === 200) {
        Swal.fire({
          title: "Expense has been updated",
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

export const deleteExpensesRequest = (expensesId: string) => {
  return axiosInstance
    .delete(`${expensesEndpoint}/${expensesId}`)
    .then((response) => {
      if (response.status === 200) {
        Swal.fire({
          title: "Expense has been removed",
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

export const getExpensesByIdRequest = (expensesId: string) => {
  return axiosInstance
    .get(`${expensesEndpoint}/${expensesId}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error;
    });
};

export interface IExpenses {
  id: string;
  description: string;
  brief_id: string;
  expense_code_id: string;
  phase_code_id: string;
  amount: string;
  date: string;
  responsible: string;
  brief: IBriefs;
  phase_code: IPhaseCodes;
}
