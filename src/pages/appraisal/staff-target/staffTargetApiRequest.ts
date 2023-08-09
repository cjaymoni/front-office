import { IFirmTarget } from "../firm-target/firmTargetApiRequest";
import { IReviewPeriod } from "../review-period/reviewPeriodApiRequest";
import { axiosInstance } from "../../../utils/api-util";
import Swal from "sweetalert2";
import { IStaff } from "../../staff/staffApiRequests";

const staffTargetsEndpoint = "hr/appraisals/staff_targets";

export const fetchStaffTargetsRequest = () => {
  return axiosInstance
    .get(staffTargetsEndpoint)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error;
    });
};

export const addNewStaffTargetsRequest = (staffTargetsData: any) => {
  return axiosInstance
    .post(staffTargetsEndpoint, staffTargetsData)
    .then((response) => {
      if (response.status === 201) {
        Swal.fire({
          title: "Staff Target added successfully",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        }).then(function () {
          window.location.assign("/staff-targets");
        });
      }
      return response.data;
    })
    .catch((error) => {
      return error;
    });
};

export const updateStaffTargetsRequest = (
  staffTargetsData: any,
  staffTargetsId: string
) => {
  return axiosInstance
    .put(`${staffTargetsEndpoint}/${staffTargetsId}`, staffTargetsData)
    .then((response) => {
      if (response.status === 200) {
        Swal.fire({
          title: "Staff Target has been updated",
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

export const deleteStaffTargetsRequest = (staffTargetsId: string) => {
  return axiosInstance
    .delete(`${staffTargetsEndpoint}/${staffTargetsId}`)
    .then((response) => {
      if (response.status === 200) {
        Swal.fire({
          title: "Staff Target has been removed",
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

export const getStaffTargetsByIdRequest = (staffTargetsId: string) => {
  return axiosInstance
    .get(`${staffTargetsEndpoint}/${staffTargetsId}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error;
    });
};

export interface IStaffTarget {
  title: string;
  description?: string;
  staff_id: string;
  department_target_id: string;
  supervisor_id: string;
  success_indicator?: string;
  minimum_rating?: number;
  maximum_rating?: number;
  employee_remarks: string;
  supervisor_remarks: string;
  status: string;
  staff?: IStaff;
  id?: string;
}
