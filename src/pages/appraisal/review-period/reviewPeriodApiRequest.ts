import { axiosInstance } from "../../../utils/api-util";
import Swal from "sweetalert2";

const reviewPeriodsEndpoint = "hr/appraisals/review_periods";

export const fetchReviewPeriodsRequest = () => {
  return axiosInstance
    .get(reviewPeriodsEndpoint)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error;
    });
};

export const addNewReviewPeriodsRequest = (reviewPeriodsData: any) => {
  return axiosInstance
    .post(reviewPeriodsEndpoint, reviewPeriodsData)
    .then((response) => {
      if (response.status === 201) {
        Swal.fire({
          title: "Review Period added successfully",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        }).then(function () {
          window.location.assign("/review-period");
        });
      }
      return response.data;
    })
    .catch((error) => {
      return error;
    });
};

export const updateReviewPeriodsRequest = (
  reviewPeriodsData: any,
  reviewPeriodsId: string
) => {
  return axiosInstance
    .put(`${reviewPeriodsEndpoint}/${reviewPeriodsId}`, reviewPeriodsData)
    .then((response) => {
      if (response.status === 200) {
        Swal.fire({
          title: "Review Period has been updated",
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

export const deleteReviewPeriodsRequest = (reviewPeriodsId: string) => {
  return axiosInstance
    .delete(`${reviewPeriodsEndpoint}/${reviewPeriodsId}`)
    .then((response) => {
      if (response.status === 200) {
        Swal.fire({
          title: "Review Period has been removed",
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

export const getReviewPeriodsByIdRequest = (reviewPeriodsId: string) => {
  return axiosInstance
    .get(`${reviewPeriodsEndpoint}/${reviewPeriodsId}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error;
    });
};

export interface IReviewPeriod {
  title: string;
  description?: string;
  start_date: string;
  end_date: string;
  year: number;
  id?: string;
}
