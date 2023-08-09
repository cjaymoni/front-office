import { IFirmTarget } from "../firm-target/firmTargetApiRequest";
import { IReviewPeriod } from "../review-period/reviewPeriodApiRequest";
import { axiosInstance } from "../../../utils/api-util";
import Swal from "sweetalert2";

const departmentTargetsEndpoint = "hr/appraisals/department_targets";

export const fetchDepartmentTargetsRequest = () => {
  return axiosInstance
    .get(departmentTargetsEndpoint)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error;
    });
};

export const addNewDepartmentTargetsRequest = (departmentTargetsData: any) => {
  return axiosInstance
    .post(departmentTargetsEndpoint, departmentTargetsData)
    .then((response) => {
      if (response.status === 201) {
        Swal.fire({
          title: "Department Target added successfully",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        }).then(function () {
          window.location.assign("/department-targets");
        });
      }
      return response.data;
    })
    .catch((error) => {
      return error;
    });
};

export const updateDepartmentTargetsRequest = (
  departmentTargetsData: any,
  departmentTargetsId: string
) => {
  return axiosInstance
    .put(
      `${departmentTargetsEndpoint}/${departmentTargetsId}`,
      departmentTargetsData
    )
    .then((response) => {
      if (response.status === 200) {
        Swal.fire({
          title: "Department Target has been updated",
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

export const deleteDepartmentTargetsRequest = (departmentTargetsId: string) => {
  return axiosInstance
    .delete(`${departmentTargetsEndpoint}/${departmentTargetsId}`)
    .then((response) => {
      if (response.status === 200) {
        Swal.fire({
          title: "Department Target has been removed",
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

export const getDepartmentTargetsByIdRequest = (
  departmentTargetsId: string
) => {
  return axiosInstance
    .get(`${departmentTargetsEndpoint}/${departmentTargetsId}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error;
    });
};

export interface IDepartmentTarget {
  title: string;
  description?: string;
  review_period_id: string;
  success_indicator?: string;
  minimum_rating?: string;
  maximum_rating?: string;
  start_date?: string;
  end_date?: string;
  firm_target_id: string;
  id?: string;
  review_period?: IReviewPeriod;
  firm_target?: IFirmTarget;
}
