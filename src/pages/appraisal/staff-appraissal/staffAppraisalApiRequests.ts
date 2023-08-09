import { axiosInstance } from "../../../utils/api-util";
import Swal from "sweetalert2";
import { IStaff } from "../../staff/staffApiRequests";
import { IDepartmentTarget } from "../department-target/departmentTargetApiRequest";
import { IReviewPeriod } from "../review-period/reviewPeriodApiRequest";

const staffAppraisalEndpoint = "hr/appraisals/staff_appraisals";

export const fetchStaffAppraisalRequest = () => {
  return axiosInstance
    .get(staffAppraisalEndpoint)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error;
    });
};

export const addNewStaffAppraisalRequest = (staffAppraisalData: any) => {
  return axiosInstance
    .post(staffAppraisalEndpoint, staffAppraisalData)
    .then((response) => {
      if (response.status === 201) {
        Swal.fire({
          title: "Staff Appraisal added successfully",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        }).then(function () {
          window.location.assign("/staff-appraisal");
        });
      }
      return response.data;
    })
    .catch((error) => {
      return error;
    });
};

export const updateStaffAppraisalRequest = (
  staffAppraisalData: any,
  staffAppraisalId: string
) => {
  return axiosInstance
    .put(`${staffAppraisalEndpoint}/${staffAppraisalId}`, staffAppraisalData)
    .then((response) => {
      if (response.status === 200) {
        Swal.fire({
          title: "Staff Appraisal has been updated",
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

export const deleteStaffAppraisalRequest = (staffAppraisalId: string) => {
  return axiosInstance
    .delete(`${staffAppraisalEndpoint}/${staffAppraisalId}`)
    .then((response) => {
      if (response.status === 200) {
        Swal.fire({
          title: "Staff Appraisal has been removed",
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

export const getStaffAppraisalByIdRequest = (staffAppraisalId: string) => {
  return axiosInstance
    .get(`${staffAppraisalEndpoint}/${staffAppraisalId}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error;
    });
};

export interface IStaffAppraisal {
  id?: string;
  quality_score?: number;
  efficiency_score?: number;
  timeliness_score?: number;
  accuracy_score?: number;
  evaluator_remarks?: string;
  staff_remarks?: string;
  staff_target_id: string;

  evaluator_id: string;

  review_period_id?: string;
  status?: string;
  evaluator?: IStaff;
  review_period?: IReviewPeriod;
  department_target?: IDepartmentTarget;
}
