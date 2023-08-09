import { IReviewPeriod } from "../review-period/reviewPeriodApiRequest";

import { axiosInstance } from "../../../utils/api-util";
import Swal from "sweetalert2";

const firmTargetsEndpoint = "hr/appraisals/hr/firm_targets";

export const fetchFirmTargetsRequest = () => {
  return axiosInstance
    .get(firmTargetsEndpoint)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error;
    });
};

export const addNewFirmTargetsRequest = (firmTargetsData: any) => {
  return axiosInstance
    .post(firmTargetsEndpoint, firmTargetsData)
    .then((response) => {
      if (response.status === 201) {
        Swal.fire({
          title: "Firm Target added successfully",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        }).then(function () {
          window.location.assign("/firm-targets");
        });
      }
      return response.data;
    })
    .catch((error) => {
      return error;
    });
};

export const updateFirmTargetsRequest = (
  firmTargetsData: any,
  firmTargetsId: string
) => {
  return axiosInstance
    .put(`${firmTargetsEndpoint}/${firmTargetsId}`, firmTargetsData)
    .then((response) => {
      if (response.status === 200) {
        Swal.fire({
          title: "Firm Target has been updated",
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

export const deleteFirmTargetsRequest = (firmTargetsId: string) => {
  return axiosInstance
    .delete(`${firmTargetsEndpoint}/${firmTargetsId}`)
    .then((response) => {
      if (response.status === 200) {
        Swal.fire({
          title: "Firm Target has been removed",
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

export const getFirmTargetsByIdRequest = (firmTargetsId: string) => {
  return axiosInstance
    .get(`${firmTargetsEndpoint}/${firmTargetsId}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error;
    });
};

export interface IFirmTarget {
  title: string;
  description?: string;
  review_period_id: string;
  success_indicator?: string;
  minimum_rating?: string;
  maximum_rating?: string;
  start_date?: string;
  end_date?: string;
  year: number;
  id?: string;
  review_period?: IReviewPeriod;
}
